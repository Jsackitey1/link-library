import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/signup');
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-gray-50 group/design-root overflow-x-hidden" style={{ fontFamily: '"Public Sans", "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#e9edf1] px-10 py-3">
          <div className="flex items-center gap-4 text-[#101419]">
            <div className="size-4">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <h2 className="text-[#101419] text-lg font-bold leading-tight tracking-[-0.015em]">Linked Library</h2>
          </div>
          <div className="flex flex-1 justify-end gap-8">
            <div className="flex items-center gap-9">
              <a className="text-[#101419] text-sm font-medium leading-normal" href="/">Home</a>
              <a className="text-[#101419] text-sm font-medium leading-normal" href="#features">Features</a>
              <a className="text-[#101419] text-sm font-medium leading-normal" href="https://jsackitey1.github.io/sackitey-portfolio/" target="_blank" rel="noopener noreferrer">Contact</a>
            </div>
            <button
              onClick={handleGetStarted}
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#d2e2f3] text-[#101419] text-sm font-bold leading-normal tracking-[0.015em]"
            >
              <span className="truncate">Get Started</span>
            </button>
          </div>
        </header>
        <div className="px-4 md:px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="md:p-4">
              <div
                className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat md:gap-8 md:rounded-xl items-center justify-center p-4"
                style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCvCMUY-68NBWH7j4BZLLyPoULUJmYEoHLGrr19WZFEAtZKEsNApKfF-f_Ja-g_wgn_DyM80v11mDt3rDBm9iG4NGNOttmTMpOpZghiga4dfjS30Lda-fO33S1jSmy5Pc5vScSKCXTYzA_MxiZh8TeHpVwa5Ikw_rF8QtvKf9xa7f6qlyC2vgspzU67SschMVeACymqmNzzsTxn1J2-8L--Je1RXY7F136PyCRD2-QSxOlkEdIVqeyuvIUsYdgiGRf8jBuRn-c5nQ")' }}
              >
                <div className="flex flex-col gap-2 text-center">
                  <h1
                    className="text-white text-4xl font-black leading-tight tracking-[-0.033em] md:text-5xl"
                  >
                    Your Digital Library, Organized
                  </h1>
                  <h2 className="text-white text-sm font-normal leading-normal md:text-base">
                    Linked Library is your central hub for saving, organizing, and accessing all your web resources. Never lose track of important articles, videos, or websites
                    again.
                  </h2>
                </div>
                <button
                  onClick={handleGetStarted}
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 md:h-12 md:px-5 bg-[#d2e2f3] text-[#101419] text-sm font-bold leading-normal tracking-[0.015em] md:text-base"
                >
                  <span className="truncate">Explore Linked Library</span>
                </button>
              </div>
            </div>
            <div id="features" className="flex flex-col gap-10 px-4 py-10">
              <div className="flex flex-col gap-4">
                <h1
                  className="text-[#101419] tracking-light text-[32px] font-bold leading-tight md:text-4xl md:font-black md:tracking-[-0.033em] max-w-[720px]"
                >
                  Key Features
                </h1>
                <p className="text-[#101419] text-base font-normal leading-normal max-w-[720px]">
                  Linked Library offers a suite of tools to help you manage your online information effectively.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-0">
                <div className="flex flex-1 gap-3 rounded-lg border border-[#d3dbe4] bg-gray-50 p-4 flex-col">
                  <div className="text-[#101419]" data-icon="Bookmark" data-size="24px" data-weight="regular">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      <path
                        d="M184,32H72A16,16,0,0,0,56,48V224a8,8,0,0,0,12.24,6.78L128,193.43l59.77,37.35A8,8,0,0,0,200,224V48A16,16,0,0,0,184,32Zm0,16V161.57l-51.77-32.35a8,8,0,0,0-8.48,0L72,161.56V48ZM132.23,177.22a8,8,0,0,0-8.48,0L72,209.57V180.43l56-35,56,35v29.14Z"
                      ></path>
                    </svg>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h2 className="text-[#101419] text-base font-bold leading-tight">Save with Ease</h2>
                    <p className="text-[#58728d] text-sm font-normal leading-normal">Quickly save any web page with our browser extension or by copying and pasting the URL.</p>
                  </div>
                </div>
                <div className="flex flex-1 gap-3 rounded-lg border border-[#d3dbe4] bg-gray-50 p-4 flex-col">
                  <div className="text-[#101419]" data-icon="AlignLeft" data-size="24px" data-weight="regular">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      <path
                        d="M48,40V216a8,8,0,0,1-16,0V40a8,8,0,0,1,16,0Zm16,64V64A16,16,0,0,1,80,48h96a16,16,0,0,1,16,16v40a16,16,0,0,1-16,16H80A16,16,0,0,1,64,104Zm16,0h96V64H80Zm152,48v40a16,16,0,0,1-16,16H80a16,16,0,0,1-16-16V152a16,16,0,0,1,16-16H216A16,16,0,0,1,232,152Zm-16,40V152H80v40H216Z"
                      ></path>
                    </svg>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h2 className="text-[#101419] text-base font-bold leading-tight">Organize Intuitively</h2>
                    <p className="text-[#58728d] text-sm font-normal leading-normal">Categorize your resources with tags, folders, and custom lists for easy navigation.</p>
                  </div>
                </div>
                <div className="flex flex-1 gap-3 rounded-lg border border-[#d3dbe4] bg-gray-50 p-4 flex-col">
                  <div className="text-[#101419]" data-icon="MagnifyingGlass" data-size="24px" data-weight="regular">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      <path
                        d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"
                      ></path>
                    </svg>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h2 className="text-[#101419] text-base font-bold leading-tight">Search Instantly</h2>
                    <p className="text-[#58728d] text-sm font-normal leading-normal">
                      Find what you need in seconds with our powerful search functionality, filtering by keywords, tags, or dates.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div id="contact" className="flex flex-col justify-end gap-6 px-4 py-10 md:gap-8 md:px-10 md:py-20">
              <div className="flex flex-col gap-2 text-center">
                <h1
                  className="text-[#101419] tracking-light text-[32px] font-bold leading-tight md:text-4xl md:font-black md:tracking-[-0.033em] max-w-[720px]"
                >
                  Ready to Take Control of Your Online Resources?
                </h1>
                <p className="text-[#101419] text-base font-normal leading-normal max-w-[720px]">
                  Join thousands of users who are already benefiting from Linked Library's streamlined approach to web resource management.
                </p>
              </div>
              <div className="flex flex-1 justify-center">
                <div className="flex justify-center">
                  <button
                    onClick={handleGetStarted}
                    className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 md:h-12 md:px-5 bg-[#d2e2f3] text-[#101419] text-sm font-bold leading-normal tracking-[0.015em] md:text-base grow"
                  >
                    <span className="truncate">Get Started</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="flex justify-center">
          <div className="flex max-w-[960px] flex-1 flex-col">
            <footer className="flex flex-col gap-6 px-5 py-10 text-center">
              <div className="flex flex-wrap items-center justify-center gap-6 md:flex-row md:justify-around">
                <span className="text-[#58728d] text-base font-normal leading-normal min-w-40">Terms of Service</span>
                <span className="text-[#58728d] text-base font-normal leading-normal min-w-40">Privacy Policy</span>
                <a className="text-[#58728d] text-base font-normal leading-normal min-w-40" href="https://jsackitey1.github.io/sackitey-portfolio/" target="_blank" rel="noopener noreferrer">Contact Us</a>
              </div>
              <p className="text-[#58728d] text-base font-normal leading-normal">© 2024 Linked Library. All rights reserved.</p>
            </footer>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Landing; 