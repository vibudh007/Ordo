import St from 'gi://St';
import Meta from 'gi://Meta';
import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import Gio from 'gi://Gio';

export default class OrdoExtension extends Extension {
    enable() {
        // --- Panel container for buttons ---
        this._panelBtn = new St.BoxLayout({
            vertical: false,
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
                const window = global.display.get_focus_window();
                if (!window) return;

                switch (data.name) {
                    case 'Minimize':
                        window.minimize();
                        break;
                    case 'Maximize':
                        if (window.get_maximized() === Meta.MaximizeFlags.BOTH)
                            window.unmaximize(Meta.MaximizeFlags.BOTH);
                        else
                            window.maximize(Meta.MaximizeFlags.BOTH);
                        break;
                    case 'Close':
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
        // --- Restore native titlebar buttons ---
        if (this._settings && this._previousLayout !== undefined) {
            this._settings.set_string('button-layout', this._previousLayout);
            this._previousLayout = null;
        }
        
        // Always null out _settings
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


