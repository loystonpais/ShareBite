{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = with pkgs; [
    nodejs_20
    yarn
    yarn2nix
    prefetch-npm-deps
    android-studio
  ];


  # DOC
  # the android release key is under android folder.
  # To build the app v
  #! npx cap build android --keystorepath releasekey.keystore --keystorepass 123456 --keystorealias alias_name --keystorealiaspass 123456 --androidreleasetype APK

  # Installing the app.
  #! npx cap run android

  # temp android studio setup
  CAPACITOR_ANDROID_STUDIO_PATH = "${pkgs.android-studio}/bin/android-studio";
  ANDROID_HOME = "/home/loystonpais/Android/Sdk";
}