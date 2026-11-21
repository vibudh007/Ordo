import St from 'gi://St';
import Meta from 'gi://Meta';
import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import Gio from 'gi://Gio';

export default class OrdoExtension extends Extension {
    enable() {
        // --- Track the last focused window so panel clicks don't lose it ---
        this._focusedWindow = global.display.get_focus_window();
        this._focusSignal = global.display.connect('notify::focus-window', () => {
            const win = global.display.get_focus_window();
            if (win) this._focusedWindow = win;
        });

        // --- Panel container for buttons ---
        this._panelBtn = new St.BoxLayout({
            style_class: 'ordo-panel-button-box',
            reactive: true,
            track_hover: true
        });
        this._panelBtn.set_style('margin: 0; padding: 0;');

        // --- Define window buttons ---
        const buttonData = [
            { name: 'Minimize', icon: 'window-minimize-symbolic' },
            { name: 'Maximize', icon: 'window-maximize-symbolic' },
            { name: 'Close', icon: 'window-close-symbolic' },
        ];

        this._buttons = [];

        buttonData.forEach((data) => {
            const btn = new St.Button({
                style_class: 'ordo-tiny-button',
                can_focus: true,
                reactive: true,
                track_hover: true
            });

            const icon = new St.Icon({
                icon_name: data.icon,
                style_class: 'system-status-icon'
            });
            btn.add_child(icon);

            btn.connect('clicked', () => {
                const window = this._focusedWindow;
                console.log(`[Ordo] "${data.name}" clicked, focused window: ${window?.get_title()}`);
                if (!window) return;

                switch (data.name) {
                    case 'Minimize':
                        console.log('[Ordo] Calling minimize()');
                        window.minimize();
                        break;
                    case 'Maximize': {
                        console.log('[Ordo] window wm_class:', window.get_wm_class?.());
                        try {
                            const currentState = window.get_maximized();
                            // On GNOME 47+, is_maximized is a property, not a function,
                            // and maximize()/unmaximize() no longer take MaximizeFlags params.
                            const hasNewApi = 'is_maximized' in window && typeof window.is_maximized !== 'function';
                            console.log('[Ordo] get_maximized():', currentState, '| Meta.MaximizeFlags.BOTH:', Meta.MaximizeFlags.BOTH);
                            console.log('[Ordo] hasNewApi (no flags needed):', hasNewApi);
                            console.log('[Ordo] can_maximize():', window.can_maximize());
                            if (currentState === Meta.MaximizeFlags.BOTH) {
                                console.log('[Ordo] Already maximized, calling unmaximize()');
                                hasNewApi ? window.unmaximize() : window.unmaximize(Meta.MaximizeFlags.BOTH);
                            } else {
                                console.log('[Ordo] Not maximized, calling maximize()');
                                hasNewApi ? window.maximize() : window.maximize(Meta.MaximizeFlags.BOTH);
                            }
                            console.log('[Ordo] get_maximized() after call:', window.get_maximized());
                        } catch (e) {
                            console.log('[Ordo] ERROR in maximize:', e.message, e.stack);
                        }
                        break;
                    }
                    case 'Close':
                        console.log('[Ordo] Calling delete()');
                        window.delete(global.get_current_time());
                        break;
                }
            });

            this._panelBtn.add_child(btn);
            this._buttons.push(btn);
        });

        // --- Insert the button box at the very right of the panel ---
        Main.panel._rightBox.add_child(this._panelBtn);

        // --- Hide native window titlebar buttons ---
        this._settings = new Gio.Settings({ schema: 'org.gnome.desktop.wm.preferences' });
        this._previousLayout = this._settings.get_string('button-layout');
        this._settings.set_string('button-layout', '');
    }

    disable() {
        // --- Disconnect focus tracking ---
        if (this._focusSignal) {
            global.display.disconnect(this._focusSignal);
            this._focusSignal = null;
        }
        this._focusedWindow = null;

        // --- Restore native titlebar buttons ---
        if (this._settings && this._previousLayout !== undefined) {
            this._settings.set_string('button-layout', this._previousLayout);
            this._previousLayout = null;
        }
        this._settings = null;

        // --- Destroy all individual buttons ---
        if (this._buttons && this._buttons.length > 0) {
            this._buttons.forEach((btn) => {
                if (btn && !btn.destroyed) {
                    btn.destroy();
                }
            });
            this._buttons = null;
        }

        // --- Destroy the panel container ---
        if (this._panelBtn) {
            this._panelBtn.destroy();
            this._panelBtn = null;
        }
    }
}
