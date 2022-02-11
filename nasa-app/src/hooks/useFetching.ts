import { useState } from 'react';

type useFetchingProps = (...args: string[]) => Promise<void>;

const useFetching = (callback: useFetchingProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const fetching = async (...args: string[]) => {
        try {
            setIsLoading(true);
            await callback(...args);
        } catch (e: any) {
            setError(e?.message);
        } finally {
            setIsLoading(false);
        }
    };
    return [fetching, isLoading, error] as const;
};
export default useFetching;
