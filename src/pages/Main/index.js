import React, { memo } from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, Form, Input, SubmitButton } from './styles';

const Main = () => {
    return (
        <Container>
            <Form>
                <Input
                    autoCorrect={false}
                    autoCapitalize="none"
                    placeholder="Adicionar Usuário"
                />
                <SubmitButton>
                    <Icon name="add" size={20} color="#fff" />
                </SubmitButton>
            </Form>
        </Container>
    );
};

export default memo(Main);
