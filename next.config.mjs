/** @type {import('next').NextConfig} */
const nextConfig = {
  api: {
    bodyParser: {
      sizeLimit: '10mb', // or increase as needed
    },
  },
  images:{
    domains:["placehold.co",'robohash.org']
  }
};

export default nextConfig;
