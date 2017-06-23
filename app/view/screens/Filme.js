'use strict';

import React, { Component } from 'react';

import {
    StyleSheet,
    View,
    StatusBar,
    Image
} from 'react-native';

import {
    Container,
    Content,
    H3,
    Badge,
    Text,
    Tab,
    Tabs,
} from 'native-base';

import {Row, Col, Grid } from "react-native-easy-grid/";

import * as color from '../../assets/colors';

import firebase from "../../dao/Banco";

import {TabFilmeSessoes} from "./TabFilmeSessoes";

import styleBase from '../../assets/styles';

export class Filme extends Component {

    constructor(props){
        super(props);

        this.genero = "";
        this.filme = this.props.navigation.state.params.filme;
        this.state = {
            genero : this.genero
        };
    }

    static navigationOptions = ({navigation}) => ({
        title : navigation.state.params.filme.nome,
    });

    componentWillMount(){

        firebase.database().ref('rede_filmes/genero/'+this.filme.genero).once('value', snap => {
            this.setState({
                genero : snap.val().tipo
            });
        });
    }

    render() {

        let filme = this.filme;

        return (
            <Container style={{backgroundColor: color.backgroundColor}}>
                <StatusBar backgroundColor={color.darkPrimaryColor} />
                <Tabs>
                    <Tab
                        heading="Filme"
                        textStyle={{color: 'white'}}
                        activeTextStyle={{color: 'white'}}
                        tabStyle={{backgroundColor: color.primaryColor}}
                        activeTabStyle={{backgroundColor: color.primaryColor}} >
                        <Content>
                            <Grid>
                                <Row>
                                    <Image
                                        style={{flex:1, height: 200}}
                                        resizeMode="cover"
                                        source={{uri: filme.imagem}}/>
                                </Row>
                                <Col style={{padding: 16, paddingTop: 16, paddingBottom: 0}}>
                                    <Row>
                                        <Badge info>
                                            <Text style={styleBase.txtInvertNormal}>
                                                {filme.idade} anos
                                            </Text>
                                        </Badge>
                                        <Badge primary style={{marginLeft: 16}}>
                                            <Text style={styleBase.txtInvertNormal}>
                                                {this.state.genero}
                                            </Text>
                                        </Badge>
                                    </Row>
                                    <Col style={{marginTop: 16}}>
                                        <Text style={styleBase.txtLabelBig}>
                                            SINOPSE E DETALHES
                                        </Text>
                                        <Text style={{textAlign: "justify", marginTop: 16, marginBottom: 16}}>
                                            <Text style={styleBase.txtLabelNormal}>
                                                {filme.sinopse}
                                            </Text>
                                        </Text>
                                    </Col>
                                </Col>
                            </Grid>
                        </Content>
                    </Tab>
                    <Tab
                        heading="Sessão"
                        textStyle={{color: 'white'}}
                        activeTextStyle={{color: 'white'}}
                        tabStyle={{backgroundColor: color.primaryColor}}
                        activeTabStyle={{backgroundColor: color.primaryColor}}>

                        <TabFilmeSessoes {...this.props}/>

                    </Tab>
                </Tabs>
            </Container>
        );
    }
}

const styles = StyleSheet.create({

});