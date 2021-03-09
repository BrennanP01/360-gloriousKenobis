package main

import (
	"testing"

	"../directorychk"
	"../licensechk"
	"../linefmtchk"
	"../utf8chk"
)

func TestValidator(t *testing.T) {
	path := `../`
	valUnits := []validator{
		&directorychk.DirChecker{Path: path},
		&licensechk.LicenseChecker{Path: path},
		&linefmtchk.LineFmtChecker{Path: path},
		&utf8chk.UTF8Checker{Path: path},
	}
	//run each validator and raise an error if fails, as all tests should succeed
	for _, unit := range valUnits {
		if unit.Validate() {
		} else {
			t.Error("Expected to validate: Failed")
		}
	}
}
