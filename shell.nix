{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = with pkgs; [
    nodejs_23
    yarn
    yarn2nix
    prefetch-npm-deps
  ];
}