import React, { memo, useState } from 'react';
import { Keyboard } from 'react-native';
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

const Main = () => {
    const [newUser, setNewUser] = useState('');
    const [users, setUsers] = useState([]);

    const handleSubmit = async () => {
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
        }
    };

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
                <SubmitButton onPress={handleSubmit}>
                    <Icon name="add" size={20} color="#fff" />
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
                        <ProfileButton>
                            <ProfileButtonText>Ver Perfil</ProfileButtonText>
                        </ProfileButton>
                    </User>
                )}
            />
        </Container>
    );
};

export default memo(Main);
