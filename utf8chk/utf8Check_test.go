package utf8chk

import (
	"testing"
)

func TestDirCheckPass(t *testing.T) {
	path := `../test-01`
	utf := new(UTF8Checker)
	utf.Path = path
	pass := utf.Validate()
	if !pass {
		t.Error("Expected True/Pass, got ", pass)
	}
}

func TestDirCheckFail(t *testing.T) {
	path := `../test-02`
	utf := new(UTF8Checker)
	utf.Path = path
	pass := utf.Validate()
	if pass {
		t.Error("Expected False/Fail, got ", pass)
	}
}
