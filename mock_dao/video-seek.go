// Code generated by MockGen. DO NOT EDIT.
// Source: video-seek.go

// Package mock_dao is a generated GoMock package.
package mock_dao

import (
	reflect "reflect"

	gomock "github.com/golang/mock/gomock"
	model "github.com/joschahenningsen/TUM-Live/model"
)

// MockVideoSeekDao is a mock of VideoSeekDao interface.
type MockVideoSeekDao struct {
	ctrl     *gomock.Controller
	recorder *MockVideoSeekDaoMockRecorder
}

// MockVideoSeekDaoMockRecorder is the mock recorder for MockVideoSeekDao.
type MockVideoSeekDaoMockRecorder struct {
	mock *MockVideoSeekDao
}

// NewMockVideoSeekDao creates a new mock instance.
func NewMockVideoSeekDao(ctrl *gomock.Controller) *MockVideoSeekDao {
	mock := &MockVideoSeekDao{ctrl: ctrl}
	mock.recorder = &MockVideoSeekDaoMockRecorder{mock}
	return mock
}

// EXPECT returns an object that allows the caller to indicate expected use.
func (m *MockVideoSeekDao) EXPECT() *MockVideoSeekDaoMockRecorder {
	return m.recorder
}

// Add mocks base method.
func (m *MockVideoSeekDao) Add(streamID string, pos float64) error {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "Add", streamID, pos)
	ret0, _ := ret[0].(error)
	return ret0
}

// Add indicates an expected call of Add.
func (mr *MockVideoSeekDaoMockRecorder) Add(streamID, pos interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "Add", reflect.TypeOf((*MockVideoSeekDao)(nil).Add), streamID, pos)
}

// Get mocks base method.
func (m *MockVideoSeekDao) Get(streamID string) ([]model.VideoSeekChunk, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "Get", streamID)
	ret0, _ := ret[0].([]model.VideoSeekChunk)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// Get indicates an expected call of Get.
func (mr *MockVideoSeekDaoMockRecorder) Get(streamID interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "Get", reflect.TypeOf((*MockVideoSeekDao)(nil).Get), streamID)
}