import './footer.css';
import Image from 'next/image';
import ScrollIntoView from '@app/components/ScrollIntoView/ScrollIntoView';
import testIds from '@app/utils/test-ids';

const FooterNote = () => (
  <div className="text-xs" data-testid={testIds.LAYOUT.FOOTER}>
    <p>© 2023 by Personal Life Coach.</p>
    <p>
      <span>Powered and secured by </span>
      <span>
        <a
          className="underline"
          href="https://wix.com/?utm_campaign=vir_created_with"
          target="_blank"
          rel="noreferrer noopener"
        >
          Wix
        </a>
      </span>
    </p>
  </div>
);

const Footer = () => (
  <footer className="w-fullm-h-56 bg-turquoise-100 leading-7">
    <div className="max-w-full-content mx-auto sm:flex gap-2 pt-11 pb-20">
      <div className="flex-1">
        <div className="px-6 sm:pr-0">
          <div className="header-line"></div>
          <p className="font-lulo mb-10">Contact</p>
          <div className="text-sm tracking-wide sm:mb-5">
            <p>
              <span>500 Terry Francois Street</span>
            </p>

            <p>
              <span>San Francisco, CA 94158</span>
            </p>

            <p>
              <span>​​</span>
            </p>

            <p>
              <span>Tel: 123-456-7890</span>
            </p>

            <p>
              <span>Fax: 123-456-7890</span>
            </p>

            <p>
              <span>​</span>
            </p>

            <p>
              <span>
                <a href="mailto:info@mysite.com" target="_self">
                  info@mysite.com
                </a>
              </span>
            </p>
          </div>
          <div className="mb-16">
            <ul aria-label="Social Bar" className="flex gap-4 items-center">
              <li>
                <a
                  href="http://www.facebook.com/wix"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    width={25}
                    height={25}
                    alt="Facebook"
                    src="https://static.wixstatic.com/media/0fdef751204647a3bbd7eaa2827ed4f9.png/v1/fill/w_33,h_33,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/0fdef751204647a3bbd7eaa2827ed4f9.png"
                  />
                </a>
              </li>
              <li>
                <a href="https://x.com/wix" target="_blank" rel="noreferrer">
                  <Image
                    width={17}
                    height={17}
                    src="https://static.wixstatic.com/media/2be684_ea277e5149dc4b86ab826475d4d64c41~mv2.png/v1/fill/w_33,h_33,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/2be684_ea277e5149dc4b86ab826475d4d64c41~mv2.png"
                    alt="X"
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/wix/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    width={25}
                    height={25}
                    src="https://static.wixstatic.com/media/01c3aff52f2a4dffa526d7a9843d46ea.png/v1/fill/w_33,h_33,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/01c3aff52f2a4dffa526d7a9843d46ea.png"
                    alt="Instagram"
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/user/Wix"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    width={25}
                    height={25}
                    src="https://static.wixstatic.com/media/78aa2057f0cb42fbbaffcbc36280a64a.png/v1/fill/w_33,h_33,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/78aa2057f0cb42fbbaffcbc36280a64a.png"
                    alt="YouTube"
                  />
                </a>
              </li>
            </ul>
          </div>
          <div className="mb-16 hidden sm:block">
            <FooterNote />
          </div>
        </div>
      </div>
      <div className="flex-1">
        <form>
          <ScrollIntoView hashName="#contact" />
          <div className="px-6 sm:pl-0 sm:pr-9">
            <div className="footer-form-field">
              <label htmlFor="contact-form-name" className="footer-form-label">
                Enter Your Name
              </label>
              <input
                className="footer-form-input"
                id="contact-form-name"
                type="text"
                name="name"
                placeholder=""
                aria-required="false"
                maxLength={100}
              />
            </div>
            <div className="footer-form-field">
              <label
                htmlFor="contact-form-email"
                className="footer-form-label"
                aria-required
              >
                Enter Your Email
              </label>
              <input
                className="footer-form-input"
                id="contact-form-email"
                type="email"
                name="email"
                required
                aria-required="true"
                pattern="^.+@.+\.[a-zA-Z]{2,63}$"
                maxLength={250}
              />
            </div>
            <div className="footer-form-field">
              <label
                htmlFor="contact-form-subject"
                className="footer-form-label"
              >
                Enter Your Subject
              </label>
              <input
                className="footer-form-input"
                id="contact-form-subject"
                type="text"
                name="subject"
                placeholder=""
                aria-required="false"
              />
            </div>
            <div className="footer-form-field">
              <label
                htmlFor="contact-form-message"
                className="footer-form-label"
              >
                Message
              </label>
              <textarea
                className="footer-form-input h-32"
                id="contact-form-message"
                name="message"
                placeholder=""
                aria-required="false"
              />
            </div>
            <div aria-disabled="false" className="flex justify-end mt-4 mb-10">
              <button
                className="btn-main w-full p-1 w-full sm:w-32"
                aria-disabled="false"
              >
                <span>Submit</span>
              </button>
            </div>
            <div className="sm:hidden">
              <FooterNote />
            </div>
          </div>
        </form>
      </div>
    </div>
  </footer>
);

export default Footer;
