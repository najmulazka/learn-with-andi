import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '../elements/Table';
import TableRow from '../elements/TableRow';
import Overview from '../fragments/Overview';
import Sidebar from '../fragments/Sidebar';
import { getSelfCheckLandingJobs, updateSelfCheckLandingJob } from '../../services/selfCheckLandingJob.service';
import { CookiesKey, CookiesStorage } from '../../utils/cookies';
import axios from 'axios';
import { getCategoryLandingJobs } from '../../services/categoryLandingJob.service';
import { downloadStyledPDF } from '../../utils/DownloadPDF';

function LandingJobUser() {
  const [landingJobs, setLandingJobs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [categoryLandingJobs, setCategoryLandingJobs] = useState({});
  console.log(landingJobs);
  const [refresh, setRefresh] = useState(true);

  const navigate = useNavigate();
  let index = 1;
  let indexMobile = 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const category = await getCategoryLandingJobs();
        setCategoryLandingJobs(category);

        const data = await getSelfCheckLandingJobs();
        setLandingJobs(data);
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
        const response = await axios.get(`${BASE_URL}/self-check-landing-job?categoryId=${categoryId}`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        setLandingJobs(response.data.data);
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

    const updateLandingJobs = landingJobs.map((landingJob) => (landingJob.id === id ? { ...landingJob, status: newStatus } : landingJob));
    setLandingJobs(updateLandingJobs);

    const data = {
      status: newStatus,
    };

    try {
      await updateSelfCheckLandingJob(id, data);
      setRefresh(!refresh);
    } catch (err) {
      if (err.message.includes('Unauthorized')) {
        navigate('/login');
      }
      const updateLandingJobs = landingJobs.map((landingJob) => (landingJob.id === id ? { ...landingJob, status: status } : landingJob));
      setLandingJobs(updateLandingJobs);
    }
  };

  const download = () => {
    downloadStyledPDF();
  };

  return (
    <div>
      <Sidebar role="user" />
      <div className="bg-gray-100 md:ml-80" id="pdf-content">
        <Overview />
        <div className="py-3.5 px-4 md:py-4 md:px-16">
          <div className="mb-4 flex justify-between">
            <div className="text-blue-900 font-bold">Progress</div>
            <button onClick={download}>download</button>
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
                  {categoryLandingJobs.length > 0 &&
                    categoryLandingJobs.map((categoryLandingJob) => (
                      <option key={categoryLandingJob.id} value={categoryLandingJob.id}>
                        {categoryLandingJob.name}
                      </option>
                    ))}
                </select>
              }
              th3="To-do List"
              th4="Action">
              {landingJobs.length > 0 &&
                landingJobs.map((landingJob) => (
                  <TableRow key={landingJob.id} td1={`${index++}.`} td2={landingJob.taskLandingJob.categoryLandingJob.name} td3={landingJob.taskLandingJob.description}>
                    <button onClick={() => handleClick(landingJob.id, landingJob.status)} className={`w-full ${landingJob.status == true ? 'bg-green-400' : 'bg-red-400'} rounded-full py-1 text-white`}>
                      {landingJob.status == true ? 'Done' : 'Nope'}
                    </button>
                  </TableRow>
                ))}
            </Table>
          </div>

          <div className="md:hidden block bg-white rounded-lg px-2 py-4">
            {
              <select name="category" id="category" className="mb-4 w-24 overflow-hidden text-ellipsis text-left" value={selectedCategory} onChange={handleCategoryChange}>
                <option value="0" selected>
                  Category
                </option>
                {categoryLandingJobs.length > 0 &&
                  categoryLandingJobs.map((categoryLandingJob) => (
                    <option key={categoryLandingJob.id} value={categoryLandingJob.id}>
                      {categoryLandingJob.name}
                    </option>
                  ))}
              </select>
            }
            {landingJobs.length > 0 &&
              landingJobs.map((landingJob) => (
                <>
                  <div className="flex flex-wrap" key={landingJob.id}>
                    <div className="flex items-center">{`${indexMobile++}.`}</div>
                    <div className="text-center mx-2 bg-blue-100 inline p-2 rounded-lg ">{landingJob.taskLandingJob.categoryLandingJob.name}</div>
                    <div className="flex items-center text-justify">{landingJob.taskLandingJob.description}</div>
                  </div>

                  <div className="mb-6 mt-2">
                    <button onClick={() => handleClick(landingJob.id, landingJob.status)} className={`w-full ${landingJob.status == true ? 'bg-green-400' : 'bg-red-400'} rounded-full py-1 text-white`}>
                      {landingJob.status == true ? 'Done' : 'Nope'}
                    </button>
                  </div>
                </>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingJobUser;
