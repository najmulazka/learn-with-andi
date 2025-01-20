import PropTypes from 'prop-types';
import Button from '../elements/Button';
import Header from '../fragments/Header';
import Footer from '../fragments/Footer';
import FaqItem from '../elements/FaqItem';
import TestimoniItem from '../elements/TestimoniItem';
import vectorBranding from '../../assets/vectorBranding.svg';
import vectorStart from '../../assets/vectorStart.svg';
import vectorTestimoni from '../../assets/vectorTestimoni.svg';
import { useEffect, useState } from 'react';
import { getTestimonials } from '../../services/testimoni.service';
import { getFaq } from '../../services/faq.service';

function LandingPage() {
  const [testimonials, setTestimonials] = useState([]);
  console.log(testimonials);
  const [faq, setFaq] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTestimonials();
        setTestimonials(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFaq();
        setFaq(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Header></Header>
      <Branding></Branding>
      <StartConseling></StartConseling>
      <LayananKonsultasi></LayananKonsultasi>
      <Testimoni>
        {testimonials.length > 0 &&
          testimonials.map((testimoni) => (
            <TestimoniItem key={testimoni.id} image={testimoni.image} name={testimoni.name} position={testimoni.position}>
              {testimoni.description}
            </TestimoniItem>
          ))}
      </Testimoni>

      <AboutAndi></AboutAndi>
      <Faq>{faq.length > 0 && faq.map((faq) => <FaqItem key={faq.id} question={faq.question} description={faq.description} />)}</Faq>
      <Footer></Footer>
    </div>
  );
}

function Branding() {
  return (
    <div id="branding" className="py-6 md:py-14 px-4 md:px-120 border" style={{ backgroundImage: `url(${vectorBranding})`, backgroundSize: 'auto', backgroundRepeat: 'no-repeat', backgroundPosition: 'left' }}>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 mb-6 md:mb-0">
          <div className="mb-3 flex items-center md:text-sm text-xs">
            <a href="https://www.instagram.com/learnwithandi" target="_blank" className="space-x-2">
              <i className="fas fa-arrow-right"></i>
              <span className="text-blue-500">LearnWIthAndi Instagram</span>
              <i className="fab fa-instagram text-pink-500"></i>
            </a>
          </div>

          <h1 className="font-bold mb-3 w-4/5 leading-tight md:leading-tight">Land Your Dream Job in 90 Days with LearnWithAndi</h1>
          <p className="text-xs md:text-base w-4/5 mb-12">Elevating Career Consultation Services for the Modern Professional</p>
          <div className="flex space-x-2 text-xs md:text-base semibold">
            {/* <a href="/booking"> */}
            <a href="https://learnwithandi.myr.id/pl/roasting-cv-and-linkedin" target="_blank">
              <button className={`font-bold py-1 px-2 md:py-2 md:px-8 border border-2 border-black bg-black text-white rounded hover:bg-white hover:text-black`} type="button">
                Consult Now!
              </button>
            </a>

            <a href="#about">
              <Button variant="white" variantHover="black" textHover="white" textColor="black">
                Who is Andi?
              </Button>
            </a>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-8 flex flex-col relative">
          <img src="/ilustration.png" alt="" />
          <div className="bg-white absolute right-0 px-2 py-1 rounded-md shadow-md top-10 md:top-14 inline-flex space-x-2">
            <img src="./roasting-linkedin-icon.png" alt="" />
            <span>Roasting CV & Linkedin</span>
          </div>
          <div className="absolute bg-white px-2 py-1 space-x-2 rounded-md shadow-md bottom-14 left-0 inline-flex items-center">
            <img src="./career-coaching-icon.png" alt="" />
            <span>Career Coaching</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function StartConseling() {
  return (
    <div className="bg-gray-200 py-6 md:py-14 px-4 md:px-120 flex flex-col items-center" style={{ backgroundImage: `url(${vectorStart})`, backgroundSize: 'auto', backgroundRepeat: 'no-repeat', backgroundPosition: 'right' }}>
      <h2 className="font-bold mb-3 text-center">How To Start Counseling</h2>
      <p className="text-center text-xs md:text-base mb-10 md:w-3/5">Starting your career journey with LearnWithAndi is simple. Follow these steps to book a personalized counseling session, anytime and anywhere.</p>

      <div className="md:grid grid-cols-4 space-x-3">
        <div className="flex flex-col items-center md:mb-0 mb-10">
          <div className="bg-indigo-300  rounded-lg">
            <img src="/startConseling0.png" alt="image" className="h-48" />
          </div>
          <h3 className="text-center mb-2 mt-8">Payment</h3>
          <p className="text-center text-10 md:text-xs">
            Click the button <strong>Book consultation</strong> and you will be directed to the payment page, with a fee of IDR 300,000 per session.
          </p>
        </div>

        <div className="flex flex-col items-center md:mb-0 mb-10">
          <div className="bg-amber-200  rounded-lg">
            <img src="/startConseling1.png" alt="image" className="h-48" />
          </div>
          <h3 className="text-center mb-2 mt-8">Select Schedule</h3>
          <p className="text-center text-10 md:text-xs">Once payment is made, you will be asked to select a meeting session schedule.</p>
        </div>

        <div className="flex flex-col items-center md:mb-0 mb-10">
          <div className="bg-indigo-300  rounded-lg">
            <img src="/startConseling2.png" alt="image" className="h-48" />
          </div>
          <h3 className="text-center mb-2 mt-8">Send CV</h3>
          <p className="text-center text-10 md:text-xs">Send your CV via linkedin chat and essential information to provide a better understanding of your background and situation</p>
        </div>

        <div className="flex flex-col items-center md:mb-0 mb-10">
          <div className="bg-amber-200  rounded-lg">
            <img src="/startConseling3.png" alt="image" className="h-48" />
          </div>
          <h3 className="text-center mb-2 mt-8">Join Video Call Session</h3>
          <p className="text-center text-10 md:text-xs">Join a one-on-one video call via a Google Meet link that goes into Gmail with andi to discuss your career goals and challenges</p>
        </div>
      </div>
    </div>
  );
}

function LayananKonsultasi() {
  return (
    <div id="services" className="py-6 md:py-14 px-4 md:px-120 flex flex-col">
      <h2 className="font-bold w-full md:w-1/2 leading-tight">Boost Your Career with Comprehensive Consulting Services from LearnWithAndi</h2>
      <div className="flex flex-col-reverse md:flex-row ">
        <div className=" flex flex-col mt-14">
          <div className="w-full md:w-4/5">
            <ListLayanan icon="train-your-student-icon.png" title="Train Your Students">
              Guide students with proven strategies to prepare them for future career challenges.
            </ListLayanan>
            <ListLayanan icon="personalized-career-consultation-icon.png" title="Personalized Career Consultation">
              Career guidance designed to help you craft strategies and achieve your career goals.
            </ListLayanan>
            <ListLayanan icon="optimize-your-cv-icon.png" title="Optimize Your CV for Recruiters">
              Get support to highlight your experience and skills in the most effective way.
            </ListLayanan>
            <ListLayanan icon="job-interview-preparation-icon.png" title="Job Interview Preparation Consultation">
              Get tailored support to confidently showcase your skills and experience in the best possible way.
            </ListLayanan>
          </div>
        </div>
        <div className="mt-5 md:mt-0">
          <img src="/services.png" alt="image" className="rounded-xl" />
        </div>
      </div>
    </div>
  );
}

function ListLayanan(props) {
  const { icon, title, children } = props;
  return (
    <div className="mb-5 md:mb-8">
      <div className="flex">
        <div className="border shadow-md flex space-x-2 rounded-md py-1 px-3 font-semibold mb-2 items-center">
          <img src={icon} alt="" />
          <h3 className="">{title}</h3>
        </div>
      </div>
      <div className="text-justify text-xs md:text-base">{children}</div>
    </div>
  );
}

function Testimoni(props) {
  const { children } = props;
  return (
    <div id="testimoni" className="flex flex-col py-6 px-4 md:px-120 md:py-14" style={{ backgroundImage: `url(${vectorTestimoni})`, backgroundSize: 'auto', backgroundRepeat: 'no-repeat', backgroundPosition: 'right' }}>
      <h2 className="font-bold mb-10 text-center">What They Say About LearnWithAndi</h2>
      <div className="flex justify-center overflow-x-auto space-x-4">{children}</div>
      <div className=" flex justify-center mt-10">
        {/* <a href="/booking"> */}
        <a href="https://learnwithandi.myr.id/pl/roasting-cv-and-linkedin" target="_blank">
          <button className={`font-bold py-1 w-36 md:py-2 md:w-48 border border-2 border-black bg-black text-white rounded hover:bg-white hover:text-black`} type="button">
            Consult Now!
          </button>
        </a>
      </div>
    </div>
  );
}

function AboutAndi() {
  return (
    <div id="about" className="flex flex-col md:flex-row items-center md:items-start py-6 md:py-14 px-4 md:px-120">
      <div className="w-full md:w-1/2 flex flex-col justify-center md:justify-start mb-4 md:mb-0">
        <h2 className="font-bold mb-4 md:hidden text-center">Meet Andi, Your Career Coach!</h2>
        <img src="/about.png" alt="Andi Satriawan Lubis" className="rounded-lg w-full object-cover shadow-lg" />
        <div className="mt-6">
          <p className="text-xs md:text-base font-medium">Andi Satriawan Lubis</p>
          <p className="text-gray-600 text-xs md:text-base ">Career Coach | International Recruiter | 7 Years in Career Development & Partnerships</p>
        </div>
      </div>

      <div className="w-full md:w-2/3 md:pl-6 md:pt-10">
        <h2 className="font-bold mb-4 hidden md:block">Meet Andi, Your Career Coach!</h2>
        <p className="text-gray-700 mb-6 text-justify text-xs md:text-base">
          Andi is a dedicated professional with expertise in People Development . Committed to guiding and supporting boot camp students, I share valuable insights and industry knowledge for their growth. Let&apos;s connect and create a
          network of learners and industry experts. Reach out for advice or collaboration opportunities. Together, let&apos;s inspire success!
        </p>
        <div className="space-y-4">
          <div className="flex space-x-2 border shadow-md p-2 rounded-lg text-xs md:text-base font-medium">
            <img src="badge-7years-icon.svg" alt="" />
            <span className="text-gray-700">7 years experience on Tech Education, Recruitment, and Career Support</span>
          </div>
          <div className="flex space-x-2 border shadow-md p-2 rounded-lg text-xs md:text-base font-medium">
            <img src="1000-student-icon.svg" alt="" />
            <span className="text-gray-700">Helping more than 1,000 students from 3 big bootcamps to get a job</span>
          </div>
        </div>

        <div className="flex mt-6 space-x-4">
          <a href="https://www.linkedin.com/company/learn-with-andi" target="_blank" className="text-blue-700 hover:text-blue-900">
            <i className="fab fa-linkedin fa-2x"></i>
          </a>
          <a href="https://www.instagram.com/learnwithandi" target="_blank" className="text-pink-500 hover:text-pink-700">
            <i className="fab fa-instagram fa-2x"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

function Faq(props) {
  const { children } = props;
  return (
    <div className="py-6 md:py-14 px-4 md:px-120 flex flex-col items-center text-center">
      <h2 className="text-3xl font-bold mb-3">Frequently Asked Questions (FAQ)</h2>
      <div className="md:w-3/5 md:mb-20 mb-10 text-xs md:text-base">
        <p className="text-center">You may have some questions before getting started. Here are answers to some frequently asked questions about LearnWithAndi&apos;s services</p>
      </div>

      <div className="w-full md:grid md:grid-cols-2">{children}</div>
    </div>
  );
}

ListLayanan.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

Testimoni.propTypes = {
  children: PropTypes.bool.isRequired,
};

Faq.propTypes = {
  children: PropTypes.bool.isRequired,
};

export default LandingPage;
