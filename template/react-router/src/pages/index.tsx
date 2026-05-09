import React, { Suspense, useEffect } from 'react';
import { useNavigation } from 'react-router';
const Index1: React.FC<{}> = () =>
{
    const navigation = useNavigation();
    useEffect(() =>
    {
        console.log(navigation)
    })
    return <div>Index Page1</div>;
};

export default Index1;
