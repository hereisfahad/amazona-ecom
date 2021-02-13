import { NextSeo } from 'next-seo';

const Page = ({ name, path, ogTitle, ogDescription, ogImage, children }) => {
  const title = `Amazona Ecom – ${name}`;
  const url = `${process.env.NEXT_PUBLIC_APP_URL}${path}`;

  return (
   <>
    <NextSeo
      title={title}
      canonical={url}
      openGraph={{
        url,
        title: ogTitle,
        description: ogDescription,
        images: [
          { 
            url: ogImage,
            width: 400,
            height: 400,
            alt: 'Og Image Alt',
          },
        ],
        site_name: 'Amazona Ecom',
      }}
    />
    {children}
   </>
  );
};

export default Page;
