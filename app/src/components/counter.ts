/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/counter.json`.
 */
export type Counter = {
    "address": "67LQVCehLSwkRQ7YoA6WMU9YGPSmpseTRHJjyT2uVGer",
    "metadata": {
      "name": "counter",
      "version": "0.1.0",
      "spec": "0.1.0",
      "description": "Created with Anchor"
    },
    "instructions": [
      {
        "name": "decrement",
        "discriminator": [
          106,
          227,
          168,
          59,
          248,
          27,
          150,
          101
        ],
        "accounts": [
          {
            "name": "myStorage",
            "writable": true
          }
        ],
        "args": []
      },
      {
        "name": "increment",
        "discriminator": [
          11,
          18,
          104,
          9,
          104,
          174,
          59,
          33
        ],
        "accounts": [
          {
            "name": "myStorage",
            "writable": true
          }
        ],
        "args": []
      },
      {
        "name": "initialize",
        "discriminator": [
          175,
          175,
          109,
          31,
          13,
          152,
          155,
          237
        ],
        "accounts": [
          {
            "name": "myStorage",
            "writable": true,
            "signer": true
          },
          {
            "name": "signer",
            "writable": true,
            "signer": true
          },
          {
            "name": "systemProgram",
            "address": "11111111111111111111111111111111"
          }
        ],
        "args": [
          {
            "name": "value",
            "type": "u64"
          }
        ]
      }
    ],
    "accounts": [
      {
        "name": "myStorage",
        "discriminator": [
          28,
          242,
          59,
          133,
          67,
          25,
          49,
          40
        ]
      }
    ],
    "types": [
      {
        "name": "myStorage",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "data",
              "type": "u64"
            }
          ]
        }
      }
    ]
  };
  