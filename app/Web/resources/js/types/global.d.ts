import { AxiosInstance } from 'axios';
import ziggyRoute, { Config as ZiggyConfig } from 'ziggy-js';

declare global {
    interface Window {
        axios: AxiosInstance;
    }

    var route: typeof ziggyRoute;
    var Ziggy: ZiggyConfig;

    namespace JSX {
        interface IntrinsicElements {
            'swiper-container': typeof import('swiper/vue')['Swiper'];
            'swiper-slide': typeof import('swiper/vue')['SwiperSlide'];
        }
    }
}
