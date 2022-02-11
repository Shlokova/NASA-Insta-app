import axios from 'axios';
import { IPost } from '../types/types';

export default class PostService {
    static async getAll(start: string, end: string) {
        const response = await axios.get<IPost[]>(
            'https://api.nasa.gov/planetary/apod',
            {
                params: {
                    api_key: '6ZI29D2OgV0eadryhrcGcskcUdztbSJKitYJA6D5',
                    start_date: start,
                    end_date: end,
                    thumbs: 'True',
                },
            }
        );
        return response.data;
    }

    static async getByDate(date: string) {
        const response = await axios.get<IPost>(
            'https://api.nasa.gov/planetary/apod',
            {
                params: {
                    api_key: '6ZI29D2OgV0eadryhrcGcskcUdztbSJKitYJA6D5',
                    date: date,
                    thumbs: 'True',
                },
            }
        );
        return response.data;
    }
}
