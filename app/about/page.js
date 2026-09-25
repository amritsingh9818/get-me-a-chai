import React from 'react'

export const metadata = {
  title: 'About - Get Me a Chai',
  description: 'Learn more about Get Me a Chai crowdfunding platform.',
}

const About = () => {
  return (
    <div 
      className="min-h-screen text-white pt-16 pb-20 bg-slate-950" 
      style={{ 
        backgroundImage: 'radial-gradient(circle, #334155 1px, transparent 1px)', 
        backgroundSize: '24px 24px' 
      }}
    >
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Intro Section */}
        <h1 className="text-3xl font-bold mb-4">About Get Me a Chai</h1>
        <p className="text-slate-300 mb-12 text-sm leading-relaxed">
          Get Me a Chai is a crowdfunding platform designed for creators to fund their projects with the support of their fans. It's a space where your fans can directly contribute to your creative endeavors by buying you a chai. Unlock the potential of your fanbase and bring your projects to life.
        </p>

        {/* How It Works Section */}
        <h2 className="text-2xl font-semibold mb-6">How It Works</h2>
        <div className="grid md:grid-cols-2 gap-10 mb-12">
          {/* Card 1 */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 mt-1">
              <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-xl">
                👥
              </div>
            </div>
            <div>
              <h3 className="text-base font-semibold mb-2">Fans Want to Collaborate</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Your fans are enthusiastic about collaborating with you on your projects.
              </p>
            </div>
          </div>
          
          {/* Card 2 */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 mt-1">
              <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-black text-lg font-bold">
                $
              </div>
            </div>
            <div>
              <h3 className="text-base font-semibold mb-2">Support Through Chai</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Receive support from your fans in the form of chai purchases, directly contributing to your project funding.
              </p>
            </div>
          </div>
        </div>

        {/* Lists Sections */}
        <div className="space-y-10">
          
          {/* Benefits for Creators */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Benefits for Creators</h2>
            <ul className="list-disc list-inside text-slate-300 text-sm space-y-2">
              <li>Direct financial support from your fanbase</li>
              <li>Engage with your fans on a more personal level</li>
              <li>Access to a platform tailored for creative projects</li>
            </ul>
          </div>

          {/* Benefits for Fans */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Benefits for Fans</h2>
            <ul className="list-disc list-inside text-slate-300 text-sm space-y-2">
              <li>Directly contribute to the success of your favorite creators</li>
              <li>Exclusive rewards and perks for supporting creators</li>
              <li>Be part of the creative process and connect with creators</li>
            </ul>
          </div>

          {/* Benefits of Collaboration */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Benefits of Collaboration</h2>
            <ul className="list-disc list-inside text-slate-300 text-sm space-y-2">
              <li>Unlock new opportunities through collaboration with fellow creators</li>
              <li>Expand your network and reach a wider audience</li>
              <li>Combine skills and resources to create innovative projects</li>
            </ul>
          </div>

          {/* Community Engagement */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Community Engagement</h2>
            <ul className="list-disc list-inside text-slate-300 text-sm space-y-2">
              <li>Interact with a supportive community of like-minded individuals</li>
              <li>Receive valuable feedback and encouragement from peers</li>
              <li>Participate in discussions and events centered around your interests</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  )
}

export default About;