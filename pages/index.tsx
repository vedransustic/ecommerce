import React from 'react';
import { client } from '../lib/client';
import { Product, FooterBanner, HeroBanner } from '../components';

const Home = ({ productsData, bannerData }) => {
	const bannerId = Math.floor(Math.random() * bannerData.length);
	return (
		<div>
			<HeroBanner heroBanner={bannerData[bannerId]} />
			<div className='products-heading'>
				<h2>Best Selling Products</h2>
				<p>Speakers of many variations</p>
			</div>
			<div className='products-container'>
				{productsData?.map((product) => (
					<Product key={product._id} product={product} />
				))}
			</div>
			<FooterBanner footerBanner={bannerData && bannerData[0]} />
		</div>
	);
};

export const getServerSideProps = async () => {
	const productQuery = '*[_type == "product"]';
	const productsData = await client.fetch(productQuery);

	const bannerQuerry = '*[_type == "banner"]';
	const bannerData = await client.fetch(bannerQuerry);

	return { props: { productsData, bannerData } };
};

export default Home;
