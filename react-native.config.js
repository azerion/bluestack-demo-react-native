module.exports = {
  dependency: {
    platforms: {
      android: {
        // packageImportPath: 'import io.some.package;',
      },
      ios: {
        scriptPhases: [
          {
            name: '[BlueStackReactNativeDemo] Configuration',
            path: './ios_config.sh',
            execution_position: 'after_compile',
            input_files: ['$(BUILT_PRODUCTS_DIR)/$(INFOPLIST_PATH)'],
          },
        ],
      },
    },
  },
};
