'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _lodash = require('lodash.debounce');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  children: _react2.default.PropTypes.object,

  /* The amount of delay between debounced calls (default: 100) */
  debounceTime: _react2.default.PropTypes.number,

  /* If set, the default width is set to this value and the child is
     rendered. If null, the child is not rendered until a width is provided */
  defaultRenderWidth: _react2.default.PropTypes.number,

  /* If true, the component checks on componentDidUpdate to see if it needs to resize */
  parentMayResize: _react2.default.PropTypes.bool
};

var defaultProps = {
  parentMayResize: false,
  defaultRenderWidth: null,
  debounceTime: 100
};

/**
 * Component for automatically setting a width prop to the DOM
 * node of the first child. Note that checking offsetWidth is a
 * somewhat expensive operation (forced reflow), so try and leave
 * `parentMayResize` false if you are having performance issues.
 *
 * Example usage:
 * <AutoWidth>
 *   <MyComponent />
 * </AutoWidth>
 *
 * MyComponent gets a `width` prop set.
 *
 */

var AutoWidth = function (_React$Component) {
  _inherits(AutoWidth, _React$Component);

  function AutoWidth(props) {
    _classCallCheck(this, AutoWidth);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AutoWidth).call(this, props));

    _this.state = {
      width: props.defaultRenderWidth
    };

    if (props.debounceTime) {
      _this.updateWidth = (0, _lodash2.default)(_this.updateWidth.bind(_this), props.debounceTime);
    } else {
      _this.updateWidth = _this.updateWidth.bind(_this);
    }
    return _this;
  }

  _createClass(AutoWidth, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.updateWidth();
      window.addEventListener('resize', this.updateWidth);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.updateWidth.cancel();
      window.removeEventListener('resize', this.updateWidth);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var parentMayResize = this.props.parentMayResize;

      // have to update width of the parent can cause a resize without a window resize
      // e.g. something collapses or expands.

      if (parentMayResize) {
        this.updateWidth();
      }
    }

    // Call set state to update the width so it starts an update of the child component

  }, {
    key: 'updateWidth',
    value: function updateWidth() {
      var width = this.state.width;

      var domWidth = this.getResizeDOMNode().offsetWidth;
      if (width !== domWidth) {
        this.setState({
          width: domWidth
        });
      }
    }
  }, {
    key: 'getResizeDOMNode',
    value: function getResizeDOMNode() {
      return _reactDom2.default.findDOMNode(this);
    }
  }, {
    key: 'render',
    value: function render() {
      var width = this.state.width;


      if (process.env.NODE_ENV !== 'production' && _react2.default.Children.count(this.props.children) > 1) {
        console.warn('AutoWidth only works with a single child element.');
      }

      var child = this.props.children;
      var childToRender = void 0;

      // if we have a child and a width is provided, render the child with the width as a prop
      if (child && width != null) {
        childToRender = _react2.default.cloneElement(child, { width: this.state.width });
      }

      // we rely on this div getting the full width from the browser's layout
      // and read its offsetWidth to set as the width to the child component.
      return _react2.default.createElement(
        'div',
        { className: 'auto-width' },
        childToRender
      );
    }
  }]);

  return AutoWidth;
}(_react2.default.Component);

AutoWidth.propTypes = propTypes;
AutoWidth.defaultProps = defaultProps;

exports.default = AutoWidth;