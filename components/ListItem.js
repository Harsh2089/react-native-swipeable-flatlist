import React from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, PanResponder, TouchableHighlight } from 'react-native';

const { width } = Dimensions.get('window');

export default class ListItem extends React.Component {
    constructor(props) {
        super(props);

        // gesture delay
        this.gestureDelay = 35;
        this.scrollViewEnabled = true;

        // getting list x and y postion
        const position = new Animated.ValueXY();

        // setting up panrespoder
        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => false,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onPanResponderTerminationRequest: (evt, gestureState) => false,
            // when list getting started moving
            onPanResponderMove: (evt, gestureState) => {

                if (gestureState.dx < -35) {
                    this.setScrollViewEnabled(false);
                    let newX = gestureState.dx + this.gestureDelay;
                    position.setValue({ x: newX, y: 0 });
                }
            },
            // when list item release (stop scrolling)
            onPanResponderRelease: (evt, gestureState) => {
                if (gestureState.dx > -10) {
                    Animated.timing(this.state.position, {
                        toValue: { x: 0, y: 0 },
                        duration: 150,
                    }).start(() => {
                        this.setScrollViewEnabled(true);
                    });
                } else {
                    Animated.timing(this.state.position, {
                        toValue: { x: gestureState.dx, y: 0 },
                        duration: 300,
                    }).start(() => {
                        // ##TODO 
                        /**
                         * Need to add action when success
                         */
                        this.setScrollViewEnabled(true);
                    });
                }
            },
        });

        this.panResponder = panResponder;
        this.state = { position };
    }

    setScrollViewEnabled(enabled) {
        if (this.scrollViewEnabled !== enabled) {
            this.props.setScrollEnabled(enabled);
            this.scrollViewEnabled = enabled;
        }
    }

    render() {

        const layoutPostion = this.state.position.getLayout();
        return (
            <View style={styles.listItem}>
                <Animated.View style={[layoutPostion]} {...this.panResponder.panHandlers}>
                    <View style={styles.innerCell}>
                        <Text>
                            {this.props.text}
                        </Text>
                    </View>
                    <View style={styles.absoluteCell}>
                        <TouchableHighlight onPress={() => console.log("presssssss")} style={[styles.cellButton, { backgroundColor: "red" }]}>
                            <Text style={styles.absoluteCellText}>DELETE</Text>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => console.log("presssssss")} style={[styles.cellButton, { backgroundColor: "blue" }]}>
                            <Text style={styles.absoluteCellText}>EDIT</Text>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => console.log("presssssss")} style={[styles.cellButton, { backgroundColor: "green" }]}>
                            <Text style={styles.absoluteCellText}>VIEW</Text>
                        </TouchableHighlight>
                    </View>
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    listItem: {
        justifyContent: 'center',
        margin: 5
    },
    absoluteCell: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: -250,
        width: 100,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    absoluteCellText: {
        margin: 16,
        color: '#FFF',
    },
    innerCell: {
        width: width - 20,
        height: 80,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        display: "flex",
        flexDirection: "column",
        margin: 5,
        elevation: 3,
        borderRadius: 5
    },
    cellButton: {
        borderRadius: 5,
        marginRight: 10
    }
});