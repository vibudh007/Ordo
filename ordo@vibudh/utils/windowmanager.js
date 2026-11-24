
import Meta from 'gi://Meta';

export class WindowManager {
    maximize(window) {
        const hasNewApi = typeof window.is_maximized === 'function';
        let isMaximized;

        if (hasNewApi) {
            // GNOME 49+
            isMaximized = window.is_maximized();
        } else {
            // Older GNOME versions
            const state = window.get_maximized();
            isMaximized = state === Meta.MaximizeFlags.BOTH;
        }

        if (isMaximized) {
            if (hasNewApi)
                window.unmaximize();
            else
                window.unmaximize(Meta.MaximizeFlags.BOTH);
        } else {
            if (hasNewApi)
                window.maximize();
            else
                window.maximize(Meta.MaximizeFlags.BOTH);
        }
    }
}
