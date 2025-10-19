# Ordo — GNOME Top Panel Window Buttons

**Ordo** is a minimalist GNOME Shell extension that moves window management buttons (minimize, maximize, close) from individual window titlebars to a unified location on the top panel. It is designed to improve workflow efficiency, reduce visual clutter, and provide a fast, intuitive way to manage windows, especially in combination with tiling window extensions like **Forge**.

<img width="420" height="163" alt="Screenshot From 2025-10-19 06-01-14" src="https://github.com/user-attachments/assets/a6fc86e0-7acf-42d5-b1d6-4a0f6813e44e" />


---

## Features

- **Unified Window Controls:** Move the three standard window buttons (minimize, maximize, close) to a single panel location.
- **Always at the Top-Right:** The buttons are positioned at the extreme right of the top panel for easy, instinctive access.
- **Tiny, Minimal Buttons:** Designed to be small and unobtrusive while remaining easy to click.
- **Hover Feedback:** Buttons have subtle hover highlights for quick identification without visual clutter.
- **Improved Workflow:** No repetition of buttons on every window titlebar; helps declutter the screen and focus on your workspace.
- **Tiling-Friendly:** Works seamlessly alongside tiling extensions like **Forge**, complementing keyboard-driven window management.

---

## Motivation

In traditional GNOME workflows, every window has its own set of titlebar buttons. This repetition can:

- Be visually cluttering when many windows are open.
- Waste screen space, particularly on smaller displays.
- Make fast window management slightly slower, as your pointer has to reach the right corner of each individual window.

**Ordo** solves this by consolidating these buttons into a single, intuitive location on the panel:

- The **close button** is always at the top-right corner, making it possible to click quickly without aiming at individual window titlebars.
- Minimize and maximize buttons are adjacent and equally accessible.
- The extension frees up vertical screen space and improves focus and speed.

---

## Installation

### Manual Installation

1. Clone the repository into your GNOME extensions folder:

```bash
git clone https://github.com/vibudh007/Ordo.git ~/.local/share/gnome-shell/extensions/ordo@vibudh
````

2. Restart GNOME Shell:

* Press `Alt + F2`, type `r`, and press Enter (on X11).
* On Wayland, log out and log back in.

3. Enable the extension:

```bash
gnome-extensions enable ordo@vibudh
```

or use **GNOME Extensions App** (usually `gnome-extensions-app`) to toggle it on.

---

### GNOME Extensions Website

* Download the latest release ZIP from [GitHub Releases](https://github.com/vibudh007/Ordo/releases) (if available).
* Install it via [GNOME Extensions](https://extensions.gnome.org/) “Install from file” option.

---

## Usage

Once enabled:

* The **three window buttons** appear at the **top-right of the panel**.
* Click **Minimize** to minimize the currently focused window.
* Click **Maximize** to toggle maximized/fullscreen state.
* Click **Close** to close the currently focused window.

The extension automatically hides the native titlebar buttons while enabled, restoring them when disabled.

## License

GNU GPL3 License © Vibudh

See [LICENSE](LICENSE) for details.
