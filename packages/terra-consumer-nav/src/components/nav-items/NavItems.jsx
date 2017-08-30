import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import NavItem from './NavItem';
import navItemShape from '../../NavPropShapes';
import styles from './NavItem.scss';

const cx = classNames.bind(styles);

const propTypes = {
  navItems: PropTypes.arrayOf(
    PropTypes.shape(
      navItemShape,
      {
        /**
         * An optional array of objects to be displayed as sub navs toggled by the main nav.
         */
        subItems: PropTypes.arrayOf(PropTypes.shape(navItemShape)),
      },
    ),
  ),
};

const defaultProps = {
  navItems: [],
};

class NavItems extends Component {
  constructor(props) {
    super(props);

    const initialIndex = props.navItems.findIndex(item => item.subItems && item.subItems.some(subItem => subItem.isActive));

    this.state = {
      openToggle: initialIndex,
    };

    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle(toggleId, isOpen) {
    this.setState({
      openToggle: isOpen ? toggleId : null,
    });
  }

  render() {
    const { navItems, ...customProps } = this.props;

    const content = navItems.map((element, i) => {
      let toggleProps = {};
      let subNavs = [];
      if (element.subItems) {
        subNavs = element.subItems.map(item => <NavItem key={item.text} {...item} />);
        toggleProps = {
          isOpen: this.state.openToggle === i,
          handleToggle: this.handleToggle,
          toggleId: i,
        };
      }

      return (
        <NavItem
          key={element.text}
          url={element.url}
          text={element.text}
          icon={element.icon}
          isActive={element.isActive}
          badgeValue={element.badgeValue}
          className={element.icon && 'nav-item-icon'}
          {...toggleProps}
        >
          {subNavs}
        </NavItem>
      );
    });

    return (
      <div {...customProps} className={cx('nav-items-contatiner', customProps.className)}>
        {content}
      </div>
    );
  }
}

NavItems.propTypes = propTypes;
NavItems.defaultProps = defaultProps;

export default NavItems;
