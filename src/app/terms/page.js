import React from 'react'

const page = () => {
  return (
    <div className="bg-black px-4 relative sm:px-6 md:px-10 lg:px-14 pb-20">
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-purple-500 rounded-full blur-[250px] opacity-40"></div>
      <div className="flex pt-24 flex-col gap-10">
        {/* Header */}
        <div className="bg-gray-100 z-20 rounded-xl py-7 sm:py-9 px-5 sm:px-9">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Terms and Conditions</h2>
          <p className="text-gray-700 mt-5 text-base sm:text-lg">
            Last updated: <b className="text-black">26/1/2026</b>
          </p>
          <p className="text-gray-700 mt-5 text-base sm:text-lg">
            These Terms and Conditions govern your use of <b className="text-black">[FusionAi.com], Owner [Vaibhav Shukla]</b>. This website is created as a demo e-commerce project for learning and portfolio purposes only. By accessing or using this website, you agree to be bound by these Terms and Conditions.
          </p>
        </div>

        {/* Use of Website */}
        <div className="bg-gray-100 z-20 rounded-xl py-7 sm:py-9 px-5 sm:px-9">
          <h2 className="text-xl sm:text-2xl lg:text-2xl font-bold">Use of the Website</h2>
          <p className="text-gray-700 mt-5 text-base sm:text-lg">
            This website is provided for educational and demonstration purposes only. You agree to use the website only for lawful purposes and in a way that does not infringe the rights of others or restrict their use of the website.
          </p>
        </div>

        {/* Demo Nature */}
        <div className="bg-gray-100 rounded-xl py-7 sm:py-9 px-5 sm:px-9">
          <h2 className="text-xl sm:text-2xl lg:text-2xl font-bold">Demo Nature of the Website</h2>
          <p className="text-gray-700 mt-5 text-base sm:text-lg">
            All products, prices, and services displayed on this website are for demonstration purposes only. No real products are sold, and no actual transactions or deliveries take place. Any orders placed on this website are purely simulated.
          </p>
        </div>

        {/* User Information */}
        <div className="bg-gray-100 rounded-xl py-7 sm:py-9 px-5 sm:px-9">
          <h2 className="text-xl sm:text-2xl lg:text-2xl font-bold">User Information</h2>
          <p className="text-gray-700 mt-5 text-base sm:text-lg">
            Any information provided by users on this website is used only to demonstrate e-commerce functionality. We do not guarantee the permanent storage, accuracy, or security of this information, as this is a demo project.
          </p>
        </div>

        {/* Intellectual Property */}
        <div className="bg-gray-100 rounded-xl py-7 sm:py-9 px-5 sm:px-9">
          <h2 className="text-xl sm:text-2xl lg:text-2xl font-bold">Intellectual Property</h2>
          <p className="text-gray-700 mt-5 text-base sm:text-lg">
            All content on this website, including text, images, logos, and design elements, is created for educational purposes and remains the property of the website owner unless otherwise stated. You may not copy, reproduce, or distribute any content without permission.
          </p>
        </div>

        {/* Limitation of Liability */}
        <div className="bg-gray-100 rounded-xl py-7 sm:py-9 px-5 sm:px-9">
          <h2 className="text-xl sm:text-2xl lg:text-2xl font-bold">Limitation of Liability</h2>
          <p className="text-gray-700 mt-5 text-base sm:text-lg">
            We are not responsible for any loss, damage, or inconvenience arising from the use of this website. Since this is a demo project, the website is provided “as is” without any warranties of any kind.
          </p>
        </div>

        {/* External Links */}
        <div className="bg-gray-100 rounded-xl py-7 sm:py-9 px-5 sm:px-9">
          <h2 className="text-xl sm:text-2xl lg:text-2xl font-bold">External Links</h2>
          <p className="text-gray-700 mt-5 text-base sm:text-lg">
            This website may contain links to third-party websites for demonstration purposes. We are not responsible for the content, policies, or practices of any third-party websites.
          </p>
        </div>

        {/* Changes to Terms */}
        <div className="bg-gray-100 rounded-xl py-7 sm:py-9 px-5 sm:px-9">
          <h2 className="text-xl sm:text-2xl lg:text-2xl font-bold">Changes to These Terms</h2>
          <p className="text-gray-700 mt-5 text-base sm:text-lg">
            We may update these Terms and Conditions at any time without prior notice. Any changes will be posted on this page. Continued use of the website indicates acceptance of the updated terms.
          </p>
        </div>

        {/* Contact Information */}
        <div className="bg-gray-100 rounded-xl py-7 sm:py-9 px-5 sm:px-9">
          <h2 className="text-xl sm:text-2xl lg:text-2xl font-bold">Contact Information</h2>
          <p className="text-gray-700 mt-5 text-base sm:text-lg">
            If you have any questions regarding these Terms and Conditions, you may contact us using the details below.
          </p>
          <p className="mt-4 text-base sm:text-lg">
            Email: <b>[your-email@example.com]</b> <br />
            Website: <b>[Voltix.com]</b>
          </p>
        </div>

        {/* Disclaimer */}
        <div className="bg-gray-100 rounded-xl py-7 sm:py-9 px-5 sm:px-9">
          <h2 className="text-xl sm:text-2xl lg:text-2xl font-bold">Disclaimer</h2>
          <p className="text-gray-700 mt-5 text-base sm:text-lg">
            This website is a demo e-commerce project created for learning and portfolio purposes only. It does not represent a real business, and no legal obligations arise from its use.
          </p>
        </div>
        {/* <div className="absolute -button-90 right-0 w-[600px] h-[600px] bg-purple-500 rounded-full blur-[250px] opacity-40"></div> */}

      </div>
    </div>

  )
}

export default page
