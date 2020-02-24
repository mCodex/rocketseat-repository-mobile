import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { ActivityIndicator } from 'react-native';
import api from '~/services/api';

import {
    Container,
    Header,
    Avatar,
    Name,
    Bio,
    Stars,
    Starred,
    OwnerAvatar,
    Info,
    Title,
    Author,
} from './styles';

const User = ({ route }) => {
    const { user } = route.params;

    const [stars, setStars] = useState([]);
    const [pagination, setPagination] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadDataFromAPI = async () => {
            try {
                const response = await api.get(`/users/${user.login}/starred`, {
                    params: { page: pagination },
                });
                setStars(prevState => [...prevState, ...response.data]);
                isLoading && setIsLoading(false);
            } catch (ex) {
                console.log(ex);
            }
        };
        loadDataFromAPI();
    }, [pagination]);

    const handleOnEndReached = () =>
        setPagination(prevState => (prevState += 1));

    return (
        <Container>
            <Header>
                <Avatar source={{ uri: user.avatar }} />
                <Name>{user.name}</Name>
                <Bio>{user.bio}</Bio>
            </Header>

            {isLoading ? (
                <ActivityIndicator color="#7159c1" />
            ) : (
                <Stars
                    data={stars}
                    keyExtractor={star => star.id.toString()}
                    renderItem={({ item }) => (
                        <Starred>
                            <OwnerAvatar
                                source={{ uri: item.owner.avatar_url }}
                            />
                            <Info>
                                <Title>{item.name}</Title>
                                <Author>{item.owner.login}</Author>
                            </Info>
                        </Starred>
                    )}
                    onEndReached={handleOnEndReached}
                    onEndReadchedThreshold={0.5}
                />
            )}
        </Container>
    );
};

User.propTypes = {
    route: PropTypes.shape({
        params: PropTypes.shape({
            user: PropTypes.shape({
                name: PropTypes.string,
                login: PropTypes.string,
                bio: PropTypes.string,
                avatar: PropTypes.string,
            }),
        }),
    }).isRequired,
};

export default memo(User);
