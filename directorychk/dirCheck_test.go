package directorychk

import (
	"testing"
)

func TestDirCheckPass(t *testing.T) {
	path := `../test-01`
	dc := new(DirChecker)
	dc.Path = path
	pass := dc.Validate()
	if !pass {
		t.Error("Expected True/Pass, got ", pass)
	}
}

func TestDirCheckFail(t *testing.T) {
	path := `../test-02`
	dc := new(DirChecker)
	dc.Path = path
	pass := dc.Validate()
	if pass {
		t.Error("Expected False/Fail, got ", pass)
	}
}
