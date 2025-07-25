import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-[#123524] mb-4">
            About Us
          </h1>
          <div className="w-24 h-1 bg-[#85A947] mx-auto"></div>
        </div>

        <div className="space-y-6">
          <p 
            className="text-lg leading-relaxed text-gray-700"
            style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
          >
            Every year, Indonesia wastes up to 21 million tons of perfectly good food.
          </p>

          <p 
            className="text-lg leading-relaxed text-gray-700"
            style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
          >
            It's a number that's hard to ignore. While this food fills our landfills and harms our environment, many families still wonder where their next meal will come from. This isn't just waste; it's a broken link in our food system.
          </p>

          <p 
            className="text-lg leading-relaxed text-gray-700"
            style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
          >
            At <strong className="text-[#123524]">FoodRescue Indonesia</strong>, we saw this problem not as an endpoint, but as an opportunity for change. We were founded on a simple belief: good food belongs on plates, not in the trash.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-[#123524] mt-10 mb-6">
            Our Solution: From Surplus to Your Table
          </h2>

          <p 
            className="text-lg leading-relaxed text-gray-700"
            style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
          >
            We are on a mission to build a better, more sustainable food future for Indonesia. We partner directly with farmers, producers, and distributors to rescue delicious, fresh, and nutritious food that would otherwise be discarded.
          </p>

          <p 
            className="text-lg leading-relaxed text-gray-700 font-semibold"
            style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
          >
            This includes:
          </p>

          <div className="ml-6 space-y-4">
            <div>
              <h3 className="text-xl font-bold text-[#85A947] mb-2">
                Imperfect Treasures:
              </h3>
              <p 
                className="text-lg leading-relaxed text-gray-700"
                style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
              >
                Fruits and vegetables that are cosmetically "imperfect"—too small, too big, or oddly shaped—but are just as delicious and nutritious.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#85A947] mb-2">
                Surplus Stock:
              </h3>
              <p 
                className="text-lg leading-relaxed text-gray-700"
                style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
              >
                Quality items that were overproduced or are nearing their best-before date but are still perfectly safe and tasty to eat.
              </p>
            </div>
          </div>

          <p 
            className="text-lg leading-relaxed text-gray-700"
            style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
          >
            By creating a seamless channel from our partners to your kitchen, we give this food a second chance to be enjoyed.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-[#123524] mt-10 mb-6">
            Why Shop With Us?
          </h2>

          <p 
            className="text-lg leading-relaxed text-gray-700"
            style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
          >
            When you buy from <strong className="text-[#123524]">FoodRescue Indonesia</strong>, your impact is real and immediate:
          </p>

          <div className="ml-6 space-y-4">
            <div>
              <h3 className="text-xl font-bold text-[#85A947] mb-2">
                You Fight Waste:
              </h3>
              <p 
                className="text-lg leading-relaxed text-gray-700"
                style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
              >
                Every purchase directly rescues food from being thrown away, reducing harmful methane emissions from landfills.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#85A947] mb-2">
                You Save Money:
              </h3>
              <p 
                className="text-lg leading-relaxed text-gray-700"
                style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
              >
                Get incredible deals on high-quality groceries, making it easier to feed your family well.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#85A947] mb-2">
                You Support Community:
              </h3>
              <p 
                className="text-lg leading-relaxed text-gray-700"
                style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
              >
                You help our local farmers and producers gain revenue for their full harvest, not just the "perfect" parts.
              </p>
            </div>
          </div>

          <div className="bg-[#85A947] bg-opacity-10 p-6 rounded-lg mt-8">
            <p 
              className="text-lg leading-relaxed text-[#123524] font-semibold text-center"
              style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
            >
              This is more than just a grocery store; it's a movement. Join us in turning the tide on food waste in Indonesia. Together, we can create a future of zero waste and full plates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
