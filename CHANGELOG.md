# Change Log

# 0.0.1

- Initial Release

# 0.0.2

- Small bug fixes & documentation improvement

# 0.1.1

- Add replugged support
- Lower required vscode version to 70 for time being

# 0.1.2

- Fix codelens position for webpack finds

# 0.1.3

- Now also supports plugin definitions stored in variables, like `const p: PluginDef = { ... }`

# 0.2.0

TODO: write notes

# 0.2.1

Added diagnostics for patches and finds

# 0.2.2

Minor bugfixes for new bundler settings

# 0.2.22

feat: Implement WebSocket server for Plexcord Companion

Added WebSocket server functionality in src/server/index.ts to handle connections and messaging with Discord clients.

Removed shared.ts as its contents were refactored or moved.

Introduced new sidebar components in src/sidebar/Nodes.ts and src/sidebar/RuntimeCommand.ts for dynamic UI elements.

Created tree data provider in src/sidebar/index.ts to manage sidebar interactions.

Defined new types in src/types/ast, src/types/server, and src/types/sidebar for better type safety and structure.

Removed deprecated webSocketServer.ts and integrated its functionality into the new server structure.

Updated TypeScript configuration files for improved project structure and compilation settings.

# 0.2.23

Update CHANGELOG for WebSocket server implementation and related changes

# 0.2.24

Update subproject commit reference in parsers
