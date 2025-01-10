{
  description = "ShareBit, a food sharing platform for the needy";

  inputs = { nixpkgs.url = "nixpkgs/nixos-unstable"; };

  outputs = { self, nixpkgs, ... }@inputs:
    let
      forAllSystems = nixpkgs.lib.genAttrs nixpkgs.lib.systems.flakeExposed;

      nixpkgsFor = forAllSystems (system: import nixpkgs { inherit system; });

      packages = forAllSystems (system: {
        default = import ./default.nix { pkgs = nixpkgsFor.${system}; };
      });

      devShells = forAllSystems (system: {
        default = import ./shell.nix { pkgs = nixpkgsFor.${system}; };
      });

    in {
      inherit packages;
      inherit devShells;
    };

}