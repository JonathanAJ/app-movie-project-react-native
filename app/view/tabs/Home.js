'use strict';

import React, { Component } from 'react';

import {
    StyleSheet,
    View,
    Image,
    StatusBar,
    Text, TouchableOpacity, TouchableNativeFeedback
} from 'react-native';

import {
    Container,
    List
} from 'native-base';

import * as color from '../../assets/colors';
import {Grid, Row, Col} from 'react-native-easy-grid';
import {formatDate} from "../../rout/Util";
import {InterestDAO} from "../../dao/InterestDAO";
import {Usuario} from "../../model/Usuario";
import firebase from '../../dao/Banco';

import styleBase from "../../assets/styles";
import Icon from "react-native-vector-icons/SimpleLineIcons";

let context = null;

export class Home extends Component {

    constructor(props){
        super(props);
        this.nav = this.props.navigation;

        this.state = {
            dataFeed: [],
			filtro: undefined,
        };

        context = this;

        this.interestDAO = new InterestDAO(this);
    }

    static navigationOptions = ({navigation}) => ({
        headerRight:
            <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple('black', true)}
                delayPressIn={0}
                onPress={() => navigation.navigate('Filtro', {context : context})}>
                <View style={{
                    height: 60,
                    width: 60,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Icon name='settings' size={20} color={'white'} />
                </View>
            </TouchableNativeFeedback>
    });

    componentWillMount(){
        this.interestDAO.listInterest();
    }

    componentWillUnmount(){
        this.interestDAO.removeListernerInterest();
    }

    render() {
        return (
            <Container style={{backgroundColor: color.backgroundColor}}>
                <StatusBar backgroundColor={color.darkPrimaryColor}/>
                {
                    this.state.filtro?
                        <Text>Filtro: {this.state.filtro.nome}</Text>:null
                }
                <List
                    dataArray={this.state.dataFeed}
                    renderRow={
                        (dataFeed, sectionID, rowID) => <FeedList dataFeed={dataFeed}
                                                                  index={rowID}
                                                                  nav={this.nav}/>
                    } />
            </Container>
        );
    }
}

class FeedList extends Component{

    constructor(props){
        super(props);
        this.userFeed = new Usuario();
        this.userFeed = this.props.dataFeed.user;
        this.nav = this.props.nav;
    }

    _openChat = () => {
        if(this.userFeed.uid !== firebase.auth().currentUser.uid)
            this.nav.navigate('PerfilFriend', {user : this.userFeed});
        else
            this.nav.navigate('Perfil');
    };

    render(){

        const dataFeed = this.props.dataFeed;
        let userFeed = this.userFeed;
        return(
            <TouchableNativeFeedback
                useForeground={true}
                background={TouchableNativeFeedback.Ripple(color.primaryColor, false)}
                delayPressIn={0}
                onPress={this._openChat}>
                <Grid pointerEvents='box-only' style={styles.container}>
                    <Row>
                        <Col style={{ width: 70 }}>
                            <Image
                                style={styles.imagemList}
                                source={{uri: userFeed.photoURL}} />
                        </Col>
                        <Col>
                            <Row>
                                <Text style={styleBase.txtLabelSmall}>
                                    <Text numberOfLines={2} style={styles.titulo}>
                                        {userFeed.displayName}
                                    </Text>
                                    <Text numberOfLines={2}>
                                        {" tem interesse em assistir "}
                                    </Text>
                                    <Text numberOfLines={2} style={styles.titulo}>
                                        {dataFeed.movieName}
                                    </Text>
                                </Text>
                            </Row>
                        </Col>
                    </Row>
                    <Row style={styles.containerText}>
                        <Row size={75} style={{marginLeft: 24, paddingBottom: 8, paddingTop: 8}}>
                            <Text style={styleBase.txtLabelNormal}>
                                <Text >
                                    {dataFeed.descriptionSession}
                                </Text>
                            </Text>
                        </Row>
                        <Row size={25} style={styles.containerData}>
                            <Text style={styleBase.txtLabelSmall}>
                                <Text style={styles.subTitulo}>
                                    {formatDate(dataFeed.createdAt)}
                                </Text>
                            </Text>
                        </Row>
                    </Row>
                </Grid>
            </TouchableNativeFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container : {
        paddingLeft: 16,
        paddingTop: 16,
        paddingRight: 16
    },
    containerText : {
        borderBottomColor: '#bbb',
        borderBottomWidth: 0.5
    },
    containerData : {
        paddingTop: 8,
        paddingBottom: 8,
        justifyContent: "flex-end"
    },
    titulo : {
        color: color.accentColor,
        fontWeight: 'bold'
    },
    subTitulo : {
        fontSize : 12,
    },
    imagemList : {
        width: 55,
        height: 55,
        borderRadius: 100,
    }
});