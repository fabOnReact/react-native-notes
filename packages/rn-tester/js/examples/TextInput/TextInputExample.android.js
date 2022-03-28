/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @flow
 */

'use strict';

const React = require('react');

const {
  Text,
  TextInput,
  View,
  StyleSheet,
  Slider,
  Switch,
} = require('react-native');

const TextInputSharedExamples = require('./TextInputSharedExamples.js');

import type {RNTesterModuleExample} from '../../types/RNTesterTypes';

class ToggleDefaultPaddingExample extends React.Component<
  $FlowFixMeProps,
  $FlowFixMeState,
> {
  constructor(props) {
    super(props);
    this.state = {hasPadding: false};
  }
  render() {
    return (
      <View>
        <TextInput style={this.state.hasPadding ? {padding: 0} : null} />
        <Text
          onPress={() => this.setState({hasPadding: !this.state.hasPadding})}>
          Toggle padding
        </Text>
      </View>
    );
  }
}

class AutogrowingTextInputExample extends React.Component<{...}> {
  constructor(props) {
    super(props);

    /* $FlowFixMe(>=0.78.0 site=react_native_android_fb) This issue was found
     * when making Flow check .android.js files. */
    this.state = {
      width: 100,
      multiline: true,
      text: '',
      contentSize: {
        width: 0,
        height: 0,
      },
    };
  }

  UNSAFE_componentWillReceiveProps(props) {
    /* $FlowFixMe(>=0.78.0 site=react_native_android_fb) This issue was found
     * when making Flow check .android.js files. */
    this.setState({
      /* $FlowFixMe(>=0.78.0 site=react_native_android_fb) This issue was found
       * when making Flow check .android.js files. */
      multiline: props.multiline,
    });
  }

  render() {
    /* $FlowFixMe(>=0.78.0 site=react_native_android_fb) This issue was found
     * when making Flow check .android.js files. */
    const {style, multiline, ...props} = this.props;
    return (
      <View>
        <Text>Width:</Text>
        <Slider
          value={100}
          minimumValue={0}
          maximumValue={100}
          step={10}
          /* $FlowFixMe(>=0.78.0 site=react_native_android_fb) This issue was
           * found when making Flow check .android.js files. */
          onValueChange={value => this.setState({width: value})}
        />
        <Text>Multiline:</Text>
        <Switch
          /* $FlowFixMe(>=0.78.0 site=react_native_android_fb) This issue was
           * found when making Flow check .android.js files. */
          value={this.state.multiline}
          /* $FlowFixMe(>=0.78.0 site=react_native_android_fb) This issue was
           * found when making Flow check .android.js files. */
          onValueChange={value => this.setState({multiline: value})}
        />
        <Text>TextInput:</Text>
        {/* $FlowFixMe(>=0.122.0 site=react_native_android_fb) This comment
         * suppresses an error found when Flow v0.122.0 was deployed. To see
         * the error, delete this comment and run Flow. */}
        <TextInput
          /* $FlowFixMe(>=0.78.0 site=react_native_android_fb) This issue was
           * found when making Flow check .android.js files. */
          multiline={this.state.multiline}
          /* $FlowFixMe(>=0.78.0 site=react_native_android_fb) This issue was
           * found when making Flow check .android.js files. */
          style={[style, {width: this.state.width + '%'}]}
          /* $FlowFixMe(>=0.78.0 site=react_native_android_fb) This issue was
           * found when making Flow check .android.js files. */
          onChangeText={value => this.setState({text: value})}
          onContentSizeChange={event =>
            /* $FlowFixMe(>=0.78.0 site=react_native_android_fb) This issue was
             * found when making Flow check .android.js files. */
            this.setState({contentSize: event.nativeEvent.contentSize})
          }
          {...props}
        />
        <Text>Plain text value representation:</Text>
        {/* $FlowFixMe(>=0.78.0 site=react_native_android_fb) This issue was
         * found when making Flow check .android.js files. */}
        <Text>{this.state.text}</Text>
        {/* $FlowFixMe(>=0.78.0 site=react_native_android_fb) This issue was
         * found when making Flow check .android.js files. */}
        <Text>Content Size: {JSON.stringify(this.state.contentSize)}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  multiline: {
    height: 60,
    fontSize: 16,
  },
  singleLine: {
    fontSize: 16,
  },
  singleLineWithHeightTextInput: {
    height: 30,
  },
});

exports.title = 'TextInput';
exports.documentationURL = 'https://reactnative.dev/docs/textinput';
exports.category = 'Basic';
exports.description = 'Single and multi-line text inputs.';
exports.examples = ([...TextInputSharedExamples]: Array<RNTesterModuleExample>);
