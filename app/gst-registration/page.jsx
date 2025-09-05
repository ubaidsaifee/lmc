import InquiryForm from "@/components/InquiryForm";
import { Star, StarHalf, FileText, Users, Scale, ShieldCheck, ReceiptText, ArrowRightLeft } from "lucide-react";

// (No changes to GoogleIcon and TrustpilotLogo components)
const GoogleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 48 48"
    className="flex-shrink-0"
    role="img"
  >
    <title>Google Icon</title>
    {/* SVG paths remain the same */}
    <path
      fill="#FFC107"
      d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
    ></path>
    <path
      fill="#FF3D00"
      d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"
    ></path>
    <path
      fill="#4CAF50"
      d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.223 0-9.657-3.356-11.303-7.962l-6.571 4.819C9.656 39.663 16.318 44 24 44z"
    ></path>
    <path
      fill="#1976D2"
      d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.012 35.841 44 30.138 44 24c0-1.341-.138-2.65-.389-3.917z"
    ></path>
  </svg>
);
const TrustpilotLogo = () => (
  <div className="flex items-center gap-1">
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
    >
      <title>Trustpilot Logo</title>
      <path
        d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"
        fill="#00B67A"
      />
    </svg>
    <span className="text-xl font-bold text-gray-800">Trustpilot</span>
  </div>
);

const PartnershipFirmPage = () => {
  return (
    <main className="bg-white font-sans w-[90%] mx-auto">
      <div className="container mx-auto px-6 py-10 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* ## Left Content Column */}
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                GST Registration
              </span>
              <span className="block h-14 bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent mt-2">
                Significance
              </span>
            </h1>
            <div className="w-24 h-1.5 bg-[#003a9b] my-4 rounded-full"></div>

            <div className="mt-6 space-y-6 text-slate-700">
              <div className="flex items-start gap-4">
                <ShieldCheck className="w-8 h-8 text-blue-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    Ensure Full Tax Compliance
                  </h3>
                  <p className="mt-1 text-base md:text-lg leading-relaxed text-justify">
                    GST registration is a legal necessity for businesses crossing the specified turnover threshold. It ensures you operate within the legal framework, avoiding heavy penalties and potential legal action.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <ReceiptText className="w-8 h-8 text-blue-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                   Claim Input Tax Credit (ITC)
                  </h3>
                  <p className="mt-1 text-base md:text-lg leading-relaxed text-justify">
                   A key benefit of registration is claiming ITC on business purchases. This allows you to reduce your overall tax liability, directly lowering your operational costs and improving profitability.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <ArrowRightLeft className="w-8 h-8 text-blue-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                   Conduct Seamless Inter-State Trade
                  </h3>
                  <p className="mt-1 text-base md:text-lg leading-relaxed text-justify">
                  With a GSTIN, you can sell goods and services across state borders without restrictions. The unified tax system simplifies logistics and compliance for businesses with a national presence.
                  </p>
                </div>
              </div>
            </div>

            

            {/* CORRECTED: Changed items-center to items-stretch */}
            <div className="mt-10 flex flex-wrap items-stretch gap-x-8 gap-y-6">
              <a
                href="https://www.google.com/search?sca_esv=adca3bde667fa053&sxsrf=AE3TifOBrQFvBhgbz0Z29wslc5dVxvwpvQ:1756720828844&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-Exyr2dFLyOstbFCL52Qo48ZESU4ISr3k2rbZg7f2QfypyyqBKvHoYxNqFMkL6i6EY5udPrWQMLsLzx989V_VbbIhsmOZeWreuOaieq8DsNBJ2_7zLg%3D%3D&q=www.letsmakecompany.com+Reviews&sa=X&ved=2ahUKEwjX9-OHp7ePAxWvcGwGHVtHOYQQ0bkNegQIKBAE&biw=1366&bih=599&dpr=1"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform duration-200 hover:-translate-y-1"
              >
                <div className="flex h-full w-56 items-center gap-3 rounded-lg border border-slate-200/80 bg-slate-50 p-3 shadow-sm hover:shadow-md">
                  <GoogleIcon />
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">
                      Google Reviews
                    </p>
                    <div className="flex items-center">
                      <span className="text-sm font-bold text-slate-700 mr-1.5">
                        4.8
                      </span>
                      <Star
                        className="w-4 h-4 text-yellow-400"
                        fill="currentColor"
                      />
                      <Star
                        className="w-4 h-4 text-yellow-400"
                        fill="currentColor"
                      />
                      <Star
                        className="w-4 h-4 text-yellow-400"
                        fill="currentColor"
                      />
                      <Star
                        className="w-4 h-4 text-yellow-400"
                        fill="currentColor"
                      />
                      <StarHalf
                        className="w-4 h-4 text-yellow-400"
                        fill="currentColor"
                      />
                    </div>
                  </div>
                </div>
              </a>
              <a
                href="https://www.trustpilot.com/users/65c0d63236341b0012d75f32"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform duration-200 hover:-translate-y-1"
              >
                <div className="flex h-full w-56 items-center justify-center rounded-lg border border-slate-200/80 bg-slate-50 p-3 shadow-sm hover:shadow-md">
                  <TrustpilotLogo />
                </div>
              </a>
            </div>
          </div>

          {/* ## Right Form Column */}
          <div className="w-full max-w-md mx-auto">
            <InquiryForm />
          </div>
        </div>
      </div>
    </main>
  );
};

export default PartnershipFirmPage;