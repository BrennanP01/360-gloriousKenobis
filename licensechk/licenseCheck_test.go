package licensechk

import (
	"testing"
)

func TestDirCheckPass(t *testing.T) {
	path := `../test-01`
	lc := new(LicenseChecker)
	lc.Path = path
	pass := lc.Validate()
	if !pass {
		t.Error("Expected True/Pass, got ", pass)
	}
}

func TestDirCheckFail(t *testing.T) {
	path := `../test-02`
	lc := new(LicenseChecker)
	lc.Path = path
	pass := lc.Validate()
	if pass {
		t.Error("Expected False/Fail, got ", pass)
	}
}
