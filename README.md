# Ordo — GNOME Top Panel Window Buttons

**Ordo** is a GNOME Shell extension that moves window control buttons (minimize, maximize, close) from each window’s titlebar to a single location on the top panel.

<img width="420" height="163" alt="Screenshot" src="https://github.com/user-attachments/assets/a6fc86e0-7acf-42d5-b1d6-4a0f6813e44e" />

---

## Features

* Adds **minimize**, **maximize**, and **close** buttons to the **top-right corner** of the GNOME panel.
* Hides the native titlebar buttons while the extension is active.
* Buttons affect the **currently focused window**.
* Works with tiling extensions such as **Forge** or **Material Shell**.

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/0952e399-3994-4ea5-8a22-6c62319cc81b" />

---

## Motivation

Each window’s titlebar normally includes its own set of control buttons, which can feel redundant.
**Ordo** replaces them with a single global set on the top panel to reduce repetition and save space.

---

## Installation

### Manual installation

1. Clone this repository:

   ```bash
   git clone https://github.com/vibudh007/Ordo.git ~/.local/share/gnome-shell/extensions/ordo@vibudh
   ```
2. Restart GNOME Shell

   * On X11: press `Alt + F2`, type `r`, and press Enter.
   * On Wayland: log out and back in.
3. Enable the extension:

   ```bash
   gnome-extensions enable ordo@vibudh
   ```

---

## Usage

* Buttons appear at the top-right of the GNOME panel.
* Click **Minimize**, **Maximize**, or **Close** to control the focused window.
* Disabling the extension restores the native titlebar buttons.

---

## License

GPL-3.0 © 2025 Vibudh
