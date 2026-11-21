export class WindowManager {
    maximize(window) {
        const hasNewApi = typeof window.is_maximized() === 'function'

        const windowMaximizeApi = hasNewApi ? window.maximize() : window.maximize(Meta.MaximizeFlags.BOTH)
        
        
        
    }
}

// if (window.get_maximized() === Meta.MaximizeFlags.BOTH)
//     window.unmaximize(Meta.MaximizeFlags.BOTH);
// else
//     window.maximize(Meta.MaximizeFlags.BOTH);