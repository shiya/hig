import Interface from 'interface.json';
import Core from '_core.js';
import Shortcut from 'components/global-nav/top-nav/shortcut/shortcut';
import Flyout from 'basics/flyout/flyout';
import './notifications.scss';
import Template from './notifications.html';
import Notification from './notification/notification';
import List from './_list/_list';

/**
 * Creates notifications
 *
 * @class
 *
 *
 */

class Notifications extends Core {
  constructor(options) {
    super(options);

    this.flyout = new Flyout();
    this._render(Template, options);
    this.initialOptions = options;
  }

  _componentDidMount() {
    this.mountPartialToComment('FLYOUT', this.flyout, this.el);
    this.flyout.setAnchorPoint('top-left');
    this.shortcut = new Shortcut({
      icon: 'notification',
      title: this.initialOptions.title
    });
    this.list = new List();

    this.flyout.addTarget(this.shortcut);
    this.flyout.addSlot(this.list);
    this.flyout.setAnchorPoint('top-right');
  }

  setUnreadCount(unreadCount) {
    this._findDOMEl(
      '.hig__notifications__unread-messages-count',
      this.el
    ).textContent = unreadCount;
  }

  open() {
    this.flyout.open();
  }

  close() {
    this.flyout.close();
  }

  addNotification(notification) {
    if (notification instanceof Notification) {
      this.list.addItem(notification);
    }
  }

  onClickOutside(fn) {
    return this.flyout.onClickOutside(fn);
  }

  onClick(fn) {
    return this.shortcut.onClick(fn);
  }

  setLoading() {
    this.list.setLoading();
  }

  setNotLoading() {
    this.list.setNotLoading();
  }

  setTitle(title) {
    if (this.list) {
      this.list.setTitle(title);
    }
  }
}

Notifications._interface =
  Interface.components.GlobalNav.partials.TopNav.partials.Notifications;
Notifications._defaults = {};
Notifications._partials = { Notification };

export default Notifications;
