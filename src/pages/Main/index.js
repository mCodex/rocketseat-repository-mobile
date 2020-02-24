import React, { memo, useState, useEffect } from 'react';
import { Keyboard, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import {
    Container,
    Form,
    Input,
    SubmitButton,
    List,
    User,
    Name,
    Avatar,
    Bio,
    ProfileButton,
    ProfileButtonText,
} from './styles';

const Main = ({ navigation }) => {
    const [newUser, setNewUser] = useState('');
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const loadDataFromAsyncStorage = async () => {
            const usersFromAS = await AsyncStorage.getItem('@users');
            if (!usersFromAS) {
                return;
            }
            setUsers(JSON.parse(usersFromAS));
        };

        loadDataFromAsyncStorage();
    }, []);

    useEffect(() => {
        AsyncStorage.setItem('@users', JSON.stringify(users));
    }, [users]);

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const response = await api.get(`/users/${newUser}`);

            const data = {
                name: response.data.name,
                login: response.data.login,
                bio: response.data.bio,
                avatar: response.data.avatar_url,
            };

            setUsers(prevState => [...prevState, data]);
            setNewUser('');
            Keyboard.dismiss();
        } catch (ex) {
            console.log(ex);
        } finally {
            setIsLoading(false);
        }
    };

    const handleNavigate = user => navigation.navigate('User', { user });

    return (
        <Container>
            <Form>
                <Input
                    autoCorrect={false}
                    autoCapitalize="none"
                    placeholder="Adicionar Usuário"
                    value={newUser}
                    onChangeText={setNewUser}
                    returnKeyType="send"
                    onSubmitEditing={handleSubmit}
                />
                <SubmitButton loading={isLoading} onPress={handleSubmit}>
                    {isLoading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Icon name="add" size={20} color="#fff" />
                    )}
                </SubmitButton>
            </Form>

            <List
                data={users}
                keyExtractor={user => user.login}
                renderItem={({ item }) => (
                    <User>
                        <Avatar source={{ uri: item.avatar }} />
                        <Name>{item.name}</Name>
                        <Bio>{item.bio}</Bio>
                        <ProfileButton onPress={() => handleNavigate(item)}>
                            <ProfileButtonText>Ver Perfil</ProfileButtonText>
                        </ProfileButton>
                    </User>
                )}
            />
        </Container>
    );
};

Main.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func,
    }).isRequired,
};

export default memo(Main);
