'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactAutobind = require('react-autobind');

var _reactAutobind2 = _interopRequireDefault(_reactAutobind);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash.debounce');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.omit');

var _lodash4 = _interopRequireDefault(_lodash3);

var _suggestions = require('./suggestions');

var _suggestions2 = _interopRequireDefault(_suggestions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SearchBar = function (_React$Component) {
  _inherits(SearchBar, _React$Component);

  function SearchBar(props) {
    _classCallCheck(this, SearchBar);

    var _this = _possibleConstructorReturn(this, (SearchBar.__proto__ || Object.getPrototypeOf(SearchBar)).call(this, props));

    if (props.renderSearchButton && !props.onSearch) {
      throw new Error('onSearch is required when rendering search button');
    }

    _this.state = {
      focusedSuggestion: null,
      isFocused: false,
      searchTerm: '',
      value: ''
    };

    (0, _reactAutobind2.default)(_this);

    _this.handleDebouncedChange = (0, _lodash2.default)(_this.handleDebouncedChange, props.delay);
    return _this;
  }

  _createClass(SearchBar, [
    {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.value !== this.props.value) {
          this.setState({value:this.props.value || ''})
        }
      }
    }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.autoFocus) {
        this.input.focus();
      }
      if (this.props.value) {
        this.setState({value:this.props.value || ''})
      }


      document.addEventListener('click', this.handleClick);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.removeEventListener('click', this.handleClick);
    }
  }, {
    key: 'setFocusedSuggestion',
    value: function setFocusedSuggestion(movingDown) {
      var _state = this.state,
          index = _state.focusedSuggestion,
          searchTerm = _state.searchTerm;
      var suggestions = this.props.suggestions;

      var last = suggestions.length - 1;
      var next = void 0;

      if (movingDown) {
        next = index === null ? 0 : index + 1;
      } else {
        next = index === null ? last : index - 1;
      }

      this.setState({
        focusedSuggestion: next > last || next < 0 ? null : next,
        value: suggestions[next] || searchTerm
      });
    }
  }, {
    key: 'clearSearch',
    value: function clearSearch() {
      this.setState({
        focusedSuggestion: null,
        searchTerm: '',
        value: ''
      });

      this.input.focus();
      this.props.onClear();
    }
  }, {
    key: 'toggleFocus',
    value: function toggleFocus() {
      this.setState({
        isFocused: !this.state.isFocused
      });
    }
  }, {
    key: 'handleClick',
    value: function handleClick(event) {
      if (!this.container.contains(event.target)) {
        this.props.onClear();
      }
    }
  }, {
    key: 'handleDebouncedChange',
    value: function handleDebouncedChange(searchTerm) {
      this.setState({
        searchTerm: searchTerm
      });

      this.props.onChange(searchTerm);
    }
  }, {
    key: 'handleChange',
    value: function handleChange(event) {
      var value = event.target.value;
      var searchTerm = value.toLowerCase().trim();

      if (!value) {
        this.clearSearch();
      }

      this.setState({
        focusedSuggestion: null,
        value: value
      });

      if (typeof searchTerm === "string") {
        this.handleDebouncedChange(searchTerm);
      }
    }
  }, {
    key: 'handleKeyDown',
    value: function handleKeyDown(event) {
      switch (event.key) {
        case 'ArrowUp':
        case 'ArrowDown':
          event.preventDefault();
          this.setFocusedSuggestion(event.key === 'ArrowDown');
          break;

        case 'Enter':
          this.handleSearch();
          break;

        case 'Escape':
          this.handleEscape();
          break;
      }
    }
  }, {
    key: 'handleEscape',
    value: function handleEscape() {
      this.setState({
        focusedSuggestion: null,
        searchTerm: ''
      });

      this.input.blur();
      this.props.onClear();
    }
  }, {
    key: 'handleHover',
    value: function handleHover(index) {
      this.setState({
        focusedSuggestion: index
      });
    }
  }, {
    key: 'handleSelection',
    value: function handleSelection(suggestion) {
      this.setState({
        focusedSuggestion: null,
        value: suggestion
      });

      this.props.onClear();

      if (this.props.onSelection) {
        this.props.onSelection(suggestion);
      }
    }
  }, {
    key: 'handleSearch',
    value: function handleSearch() {
      this.props.onClear();
      this.props.onSearch(this.state.value.trim());
    }
  }, {
    key: 'renderClearButton',
    value: function renderClearButton() {
      return _react2.default.createElement('button', {
        className: this.props.styles.clearButton,
        onClick: this.clearSearch
      });
    }
  }, {
    key: 'renderSearchButton',
    value: function renderSearchButton() {
      return _react2.default.createElement('button', {
        className: this.props.styles.submitButton,
        onClick: this.handleSearch
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this,
          _classNames;

      var props = this.props,
          state = this.state;
      var renderSearchButton = props.renderSearchButton,
          styles = props.styles;

      var attributes = (0, _lodash4.default)(props, Object.keys(SearchBar.propTypes));

      var renderClearButton = state.value && props.renderClearButton;

      var renderSuggestions = state.value && props.suggestions.length > 0;

      return _react2.default.createElement(
        'div',
        {
          className: styles.wrapper,
          ref: function ref(_ref2) {
            return _this2.container = _ref2;
          }
        },
        _react2.default.createElement(
          'div',
          {
            className: (0, _classnames2.default)((_classNames = {}, _defineProperty(_classNames, styles.field, true), _defineProperty(_classNames, styles.fieldFocused, state.isFocused), _defineProperty(_classNames, styles.hasSuggestions, props.suggestions.length > 0), _classNames))
          },
          _react2.default.createElement('input', _extends({}, attributes, {
            className: styles.input,
            type: 'text',
            ref: function ref(_ref) {
              return _this2.input = _ref;
            },
            value: state.value,
            onChange: this.handleChange,
            onFocus: this.toggleFocus,
            onBlur: this.toggleFocus,
            onKeyDown: props.suggestions && this.handleKeyDown
          })),
          renderClearButton && this.renderClearButton(),
          renderSearchButton && this.renderSearchButton()
        ),
        renderSuggestions && _react2.default.createElement(_suggestions2.default, {
          focusedSuggestion: state.focusedSuggestion,
          onSelection: this.handleSelection,
          onSuggestionHover: this.handleHover,
          searchTerm: state.searchTerm,
          styles: styles,
          suggestions: props.suggestions,
          suggestionRenderer: props.suggestionRenderer
        })
      );
    }
  }]);

  return SearchBar;
}(_react2.default.Component);

SearchBar.propTypes = {
  autoFocus: _propTypes2.default.bool,
  delay: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
  onClear: _propTypes2.default.func.isRequired,
  onChange: _propTypes2.default.func.isRequired,
  onSearch: _propTypes2.default.func,
  onSelection: _propTypes2.default.func,
  renderClearButton: _propTypes2.default.bool,
  renderSearchButton: _propTypes2.default.bool,
  styles: _propTypes2.default.object,
  suggestions: _propTypes2.default.array.isRequired,
  suggestionRenderer: _propTypes2.default.func
};

SearchBar.defaultProps = {
  autoCapitalize: 'off',
  autoComplete: 'off',
  autoCorrect: 'off',
  autoFocus: false,
  delay: 0,
  maxLength: 100,
  placeholder: '',
  renderClearButton: false,
  renderSearchButton: false,
  styles: {
    wrapper: 'react-search-bar__wrapper',
    field: 'react-search-bar__field',
    focusedField: 'react-search-bar__field--focused',
    hasSuggestions: 'react-search-bar__field--has-suggestions',
    input: 'react-search-bar__input',
    clearButton: 'react-search-bar__clear',
    submitButton: 'react-search-bar__submit',
    suggestions: 'react-search-bar__suggestions',
    suggestion: 'react-search-bar__suggestion'
  },
  suggestionRenderer: function suggestionRenderer(suggestion) {
    return _react2.default.createElement(
      'div',
      null,
      suggestion
    );
  }
};

exports.default = SearchBar;
