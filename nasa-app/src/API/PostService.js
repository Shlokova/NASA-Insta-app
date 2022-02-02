import axios from 'axios';

export default class PostService {
    static async getAll(start, end) {
        const response = await axios.get(
            'https://api.nasa.gov/planetary/apod',
            {
                params: {
                    api_key: '6ZI29D2OgV0eadryhrcGcskcUdztbSJKitYJA6D5',
                    // count: 2,
                    start_date: start,
                    end_date: end,
                    thumbs: 'True',
                },
            }
        );
        return response.data;
    }

    static async getByDate(date) {
        const response = await axios.get(
            'https://api.nasa.gov/planetary/apod',
            {
                params: {
                    api_key: '6ZI29D2OgV0eadryhrcGcskcUdztbSJKitYJA6D5',
                    // count: 2,
                    date: date,
                    thumbs: 'True',
                },
            }
        );
        return response.data;
    }
}
