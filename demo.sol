// SPDX-License-Identifier: Unlicense

pragma solidity >=0.5.0 < 0.9.0;

contract demo {
    uint public x = 10;

    function setter(uint _x) public{
        x = _x;
    }
}