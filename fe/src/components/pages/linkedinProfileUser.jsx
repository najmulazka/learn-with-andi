import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSelfCheckLinkedinProfiles, updateSelfCheckLinkedinProfile } from '../../services/selfCheckLinkedinProfile.service';
import Table from '../elements/Table';
import Overview from '../fragments/Overview';
import Sidebar from '../fragments/Sidebar';
import { getCategoryLinkedinProfiles } from '../../services/categoryLinkedinProfile.service';
import { CookiesKey, CookiesStorage } from '../../utils/cookies';
import axios from 'axios';
import ModalPopUp from '../elements/ModalPopUp';
import { getReferencesLinkedinProfile } from '../../services/referencesLinkedinProfile.service';

function LinkedinProfileUser() {
  const [referencesLinkedinProfiles, setReferencesLinkedinProfiles] = useState([]);
  const [linkedinProfiles, setLinkedinProfiles] = useState([]);
  const [categoryLinkedinProfiles, setCategoryLinkedinProfiles] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [referencesIsOpen, setReferencesIsOpen] = useState(false);
  const [refresh, setRefresh] = useState(true);

  const navigate = useNavigate();
  let index = 0;
  let indexMobile = 0;
  let previousCategoryId = null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const category = await getCategoryLinkedinProfiles();
        setCategoryLinkedinProfiles(category);

        const references = await getReferencesLinkedinProfile();
        setReferencesLinkedinProfiles(references);

        const data = await getSelfCheckLinkedinProfiles();
        setLinkedinProfiles(data);
      } catch (err) {
        if (err.message.includes('Unauthorized')) {
          navigate('/login');
        }
      }
    };

    fetchData();
  }, [navigate, refresh]);

  const handleCategoryChange = async (event) => {
    const categoryId = event.target.value;
    setSelectedCategory(categoryId);

    const BASE_URL = import.meta.env.VITE_URL;
    const token = CookiesStorage.get(CookiesKey.AuthToken);

    if (categoryId === '0') {
      setRefresh(!refresh);
    } else if (categoryId !== '0') {
      try {
        const response = await axios.get(`${BASE_URL}/self-check-linkedin-profile?categoryId=${categoryId}`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        setLinkedinProfiles(response.data.data);
        // return response.data.data;
      } catch (error) {
        if (error.response && error.response.status === 401) {
          CookiesStorage.remove(CookiesKey.TokenAdmin);
          throw new Error('Unauthorized: Token is invalid');
        }
        throw error;
      }
    }
  };

  const handleClick = async (id, status) => {
    const newStatus = !status;
    const updateLinkedinProfile = linkedinProfiles.map((linkedinProfile) => (linkedinProfile.id === id ? { ...linkedinProfile, status: newStatus } : linkedinProfile));
    setLinkedinProfiles(updateLinkedinProfile);

    const data = {
      status: newStatus,
    };

    try {
      await updateSelfCheckLinkedinProfile(id, data);
      setRefresh(!refresh);
    } catch (err) {
      if (err.message.includes('Unauthorized')) {
        navigate('/login');
      }

      const updateLinkedinProfiles = linkedinProfiles.map((linkedinProfile) => (linkedinProfile.id === id ? { ...linkedinProfile, status: status } : linkedinProfile));
      setLinkedinProfiles(updateLinkedinProfiles);
    }
  };

  const handleReferences = async () => {
    setReferencesIsOpen(!referencesIsOpen);
  };

  return (
    <div>
      {referencesIsOpen && (
        <ModalPopUp isOpen={referencesIsOpen} toggleModal={handleReferences}>
          <div className="grid grid-cols-1 gap-4" onClick={handleReferences}>
            {referencesLinkedinProfiles.length > 0 &&
              referencesLinkedinProfiles.map((reference) => (
                <div key={reference.fileId} className="flex flex-col items-center">
                  <img src={reference.imageUrl} alt={`Image with fileId: ${reference.fileId}`} className="w-full object-contain" />
                </div>
              ))}
          </div>
        </ModalPopUp>
      )}

      <Sidebar role="user" />

      <div className="bg-gray-100 md:ml-80">
        <Overview />
        <div className="py-3.5 px-4 md:py-4 md:px-16">
          <div className="mb-4 flex flex-col md:justify-between">
            <div className="w-full mb-4">
              <button
                className="block md:hidden group bg-green-400 justify-center border border-green-400 text-white hover:bg-white hover:text-green-400 px-4 py-1 rounded-full font-semibold w-full flex flex-row space-x-2"
                onClick={handleReferences}>
                <div>References</div>
                <svg width="24" height="25" viewBox="0 0 24 25" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="group-hover:fill-green-400">
                  <path d="M12.0003 3.5C17.3924 3.5 21.8784 7.37976 22.8189 12.5C21.8784 17.6202 17.3924 21.5 12.0003 21.5C6.60812 21.5 2.12215 17.6202 1.18164 12.5C2.12215 7.37976 6.60812 3.5 12.0003 3.5ZM12.0003 19.5C16.2359 19.5 19.8603 16.552 20.7777 12.5C19.8603 8.44803 16.2359 5.5 12.0003 5.5C7.7646 5.5 4.14022 8.44803 3.22278 12.5C4.14022 16.552 7.7646 19.5 12.0003 19.5ZM12.0003 17C9.51498 17 7.50026 14.9853 7.50026 12.5C7.50026 10.0147 9.51498 8 12.0003 8C14.4855 8 16.5003 10.0147 16.5003 12.5C16.5003 14.9853 14.4855 17 12.0003 17ZM12.0003 15C13.381 15 14.5003 13.8807 14.5003 12.5C14.5003 11.1193 13.381 10 12.0003 10C10.6196 10 9.50026 11.1193 9.50026 12.5C9.50026 13.8807 10.6196 15 12.0003 15Z" />
                </svg>
              </button>
            </div>

            <div className="flex flex-col md:flex-row justify-left md:items-center space-x-4">
              <div className="text-blue-900 font-bold">Progress</div>
              <div className="hidden md:block">
                <button className=" group bg-green-400 border border-green-400 text-white hover:bg-white hover:text-green-400 px-4 py-1 rounded-full font-semibold flex flex-row space-x-2" onClick={handleReferences}>
                  <div>References</div>
                  <svg width="24" height="25" viewBox="0 0 24 25" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="group-hover:fill-green-400">
                    <path d="M12.0003 3.5C17.3924 3.5 21.8784 7.37976 22.8189 12.5C21.8784 17.6202 17.3924 21.5 12.0003 21.5C6.60812 21.5 2.12215 17.6202 1.18164 12.5C2.12215 7.37976 6.60812 3.5 12.0003 3.5ZM12.0003 19.5C16.2359 19.5 19.8603 16.552 20.7777 12.5C19.8603 8.44803 16.2359 5.5 12.0003 5.5C7.7646 5.5 4.14022 8.44803 3.22278 12.5C4.14022 16.552 7.7646 19.5 12.0003 19.5ZM12.0003 17C9.51498 17 7.50026 14.9853 7.50026 12.5C7.50026 10.0147 9.51498 8 12.0003 8C14.4855 8 16.5003 10.0147 16.5003 12.5C16.5003 14.9853 14.4855 17 12.0003 17ZM12.0003 15C13.381 15 14.5003 13.8807 14.5003 12.5C14.5003 11.1193 13.381 10 12.0003 10C10.6196 10 9.50026 11.1193 9.50026 12.5C9.50026 13.8807 10.6196 15 12.0003 15Z" />
                  </svg>
                </button>
              </div>
            </div>
            {/* <input type="text" id="search" className="rounded-full py-2 px-2 text-center text-gray-800 text-sm shadow-md" placeholder="Search for something" /> */}
          </div>
          <div className="hidden md:block">
            <Table
              th1="No"
              th2={
                <select name="category" id="category" className="w-[200px] max-w-[200px] overflow-hidden text-ellipsis text-left" value={selectedCategory} onChange={handleCategoryChange}>
                  <option value="0" selected>
                    Category
                  </option>
                  {categoryLinkedinProfiles.length > 0 &&
                    categoryLinkedinProfiles.map((categoryLinkedinProfile) => (
                      <option key={categoryLinkedinProfile.id} value={categoryLinkedinProfile.id}>
                        {categoryLinkedinProfile.name}
                      </option>
                    ))}
                </select>
              }
              th3="To-do List"
              th4="Action">
              {linkedinProfiles.length > 0 &&
                linkedinProfiles.map((linkedinProfile) => {
                  const isNewCategory = previousCategoryId !== linkedinProfile.taskLinkedinProfile.categoryLinkedinProfile.id;
                  if (isNewCategory) {
                    index++;
                    previousCategoryId = linkedinProfile.taskLinkedinProfile.categoryLinkedinProfile.id;
                  }
                  return (
                    <tr key={linkedinProfile.id}>
                      <td className="text-left">{isNewCategory ? index : ''}</td>
                      <td className="text-left">{linkedinProfile.taskLinkedinProfile.categoryLinkedinProfile.name}</td>
                      <td className="text-left">{linkedinProfile.taskLinkedinProfile.description}</td>
                      <td className="text-left">
                        <button onClick={() => handleClick(linkedinProfile.id, linkedinProfile.status)} className={`w-full ${linkedinProfile.status == true ? 'bg-green-400' : 'bg-red-400'} rounded-full py-1 text-white`}>
                          {linkedinProfile.status == true ? 'Done' : 'Nope'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </Table>
          </div>

          <div className="md:hidden block bg-white rounded-lg px-2 py-4">
            {
              <select name="category" id="category" className="mb-4 w-24 overflow-hidden text-ellipsis text-left" value={selectedCategory} onChange={handleCategoryChange}>
                <option value="0" selected>
                  Category
                </option>
                {categoryLinkedinProfiles.length > 0 &&
                  categoryLinkedinProfiles.map((categoryLinkedinProfile) => (
                    <option key={categoryLinkedinProfile.id} value={categoryLinkedinProfile.id}>
                      {categoryLinkedinProfile.name}
                    </option>
                  ))}
              </select>
            }
            {linkedinProfiles.length > 0 &&
              linkedinProfiles.map((linkedinProfile) => {
                const isNewCategory = previousCategoryId !== linkedinProfile.taskLinkedinProfile.categoryLinkedinProfile.id;
                if (isNewCategory) {
                  indexMobile++;
                  previousCategoryId = linkedinProfile.taskLinkedinProfile.categoryLinkedinProfile.id;
                }
                return (
                  <>
                    <div className="flex flex-wrap" key={linkedinProfile.id}>
                      <div className="flex items-center">{isNewCategory ? `${indexMobile}. ` : ''}</div>
                      <div className={`${isNewCategory == true ? `` : 'ml-4'} text-center mx-2 bg-blue-100 inline p-2 rounded-lg`}>{linkedinProfile.taskLinkedinProfile.categoryLinkedinProfile.name}</div>
                      <div className="flex items-center text-justify">{linkedinProfile.taskLinkedinProfile.description}</div>
                    </div>

                    <div className="mb-6 mt-2">
                      <button onClick={() => handleClick(linkedinProfile.id, linkedinProfile.status)} className={`w-full ${linkedinProfile.status == true ? 'bg-green-400' : 'bg-red-400'} rounded-full py-1 text-white`}>
                        {linkedinProfile.status == true ? 'Done' : 'Nope'}
                      </button>
                    </div>
                  </>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LinkedinProfileUser;
