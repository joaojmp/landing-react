import { LazyLoadComponent } from 'react-lazy-load-image-component';

import { register } from 'swiper/element/bundle';
import { Banner } from "@/src/Banners/Types/Banner";

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function Banners({ banners }: { banners: Banner[] }) {
    register();

    const picture = (banner: Banner) => {
        return (
            <LazyLoadComponent>
                <picture>
                    {banner.mobile && <source media="(max-width: 425px)" srcSet={`./storage/banners/${banner.mobile}`} width="425" height="500" />}

                    {banner.tablet && <source media="(max-width: 768px)" srcSet={`./storage/banners/${banner.tablet}`} width="768" height="300" />}

                    <img src={`./storage/banners/${banner.desktop}`} alt={banner.title} width="1920" height="700" loading="lazy" />
                </picture>
            </LazyLoadComponent>
        );
    }

    return (
        <section className='max-w-[1920px] mx-auto'>
            <swiper-container pagination="true">
                {banners.map((banner) => (
                    <swiper-slide key={banner.id}>
                        {banner.link ? <a href={banner.link} target="_blank" rel="noopener noreferrer">{picture(banner)}</a> : picture(banner)}
                    </swiper-slide>
                ))}
            </swiper-container>
        </section>
    );
};
