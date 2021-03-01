package linefmtchk

import (
	"testing"
)

func TestDirCheckPass(t *testing.T) {
	path := `../test-01`
	lf := new(LineFmtChecker)
	lf.Path = path
	pass := lf.Validate()
	if !pass {
		t.Error("Expected True/Pass, got ", pass)
	}
}

func TestDirCheckFail(t *testing.T) {
	path := `../test-02`
	lf := new(LineFmtChecker)
	lf.Path = path
	pass := lf.Validate()
	if pass {
		t.Error("Expected False/Fail, got ", pass)
	}
}
