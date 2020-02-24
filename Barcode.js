import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView, Keyboard, Alert, AppRegistry, ToastAndroid } from "react-native";
import { Button, ThemeProvider, Header, ListItem, Overlay } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Card } from "react-native-elements";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Spinner from "react-native-loading-spinner-overlay";
import { StackNavigator } from "@react-navigation/native";
import { updateBarcode } from "../actions/updateBarcode";
import { withNavigation } from 'react-navigation';

// const input = React.createRef();

class Barcode extends React.Component {

    input = React.createRef();

    constructor(props) {
        super(props);
        this.input = React.createRef()
        this.state = {
            text: "",
            textSearch: "",
            visible: false,
            textBarcode: "",
            updateOverlay: false
        };
        this.Save = this.Save.bind(this);
    }

    componentDidMount() {
            setTimeout(() => {
                this.input.current.focus();
          }, 400);
    }

    Save() {
        if (this.state.textBarcode.length >= 4) {
          const { handleupdateBarcode } = this.props;
          handleupdateBarcode({ stockid: this.props.route.params.stockidRewn, barcode: this.state.textBarcode });
        } else {
          Alert.alert("Ingresa al menos 4 caracteres para el código de barras");
        }
      }
    
      moveUpdate() {
        const { barcodeReducerMessageVisible, barcodeReducerMessage, barcodeReducerMessageFinished } = this.props;
        if(barcodeReducerMessageFinished) {
          this.props.navigation.navigate('Search');
        }
      }

      render() {
        const { textBarcode } = this.state;
        const { stockIdRenew, barcodeReducerMessageVisible, handleupdateBarcode, barcodeReducer, barcodeReducerMessage } = this.props;
        return (
          <ThemeProvider>
             { this.moveUpdate() }
            <Spinner
              visible={barcodeReducerMessageVisible}
              overlayColor={"rgba(0, 0, 0, .9)"}
            />
            <Card title={"Guardar código de barras: " + this.props.route.params.stockidRewn}>
              <ScrollView keyboardShouldPersistTaps={'handled'}>
                <Input
                  label="Código de barras"
                  placeholder="Código de barras"
                  errorStyle={{ color: "red" }}
                  inputStyle={{ marginTop: 40, marginBottom: 40 }}
                  onChangeText={textBarcode => this.setState({ textBarcode })}
                  value={textBarcode}
                  ref={(ref) => { this.input = ref }}
                  onBlur={() => this.Save()}
                />
                <Button
                  iconRight
                  title="Guardar "
                  color="black"
                  style={{flex:1 , marginTop: 20, minHeight: '10%' }}
                  onPress={() => this.Save()}
                />
              </ScrollView>
            </Card>
          </ThemeProvider>
        );
      }
}

Barcode.defaultProps = {
    barcodeReducer: {},
    barcodeReducerMessage: null,
    barcodeReducerMessageVisible: false,
    barcodeReducerMessageFinished: false
};

function mapStateToProps(state) {
    return {
        barcodeReducer: state.barcodeReducer,
        barcodeReducerMessage: state.barcodeReducer.message,
        barcodeReducerMessageVisible: state.barcodeReducer.visible,
        barcodeReducerMessageFinished: state.barcodeReducer.finished
    };
}


function mapDispatchToProps(dispatch) {
    return {
        handleupdateBarcode: bindActionCreators(updateBarcode, dispatch)
    };
}

const BarcodeMapped = connect(mapStateToProps, mapDispatchToProps)(Barcode);
export default BarcodeMapped;
