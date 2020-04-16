import React, { Component } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import ListItem from './components/ListItem';
import data from './constants/Data';

export default class SwipeableList extends Component {

    constructor(props) {
        super(props);

        this.setScrollEnabled = this.setScrollEnabled.bind(this);
        this.state = {
            enable: true,
            data: [...data],
        };
    }

    // handle scroll 
    setScrollEnabled(enable) {
        this.setState({
            enable,
        });
    }

    // render list item
    renderItem(item) {
        return (
            <ListItem
                text={item.key}
                setScrollEnabled={enable => this.setScrollEnabled(enable)}
            />
        );
    }

    // rendering main view
    render() {
        return (
            <View style={styles.container}>
            <FlatList
                data={this.state.data}
                renderItem={({ item }) => this.renderItem(item)}
                scrollEnabled={this.state.enable}
            />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginTop: 20
    }
})