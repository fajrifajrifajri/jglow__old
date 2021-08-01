import React, { Component } from 'react';
class ErrorNotice extends Component {
	render() {
	return (
			<div className="flex items-center font-medium tracking-wide bg-red-300 text-white text-xs p-2">
				<span>{this.props.message}</span>
				<button className="ml-auto" onClick={this.props.clearError}>X</button>
			</div>
		);
	}
}
export default ErrorNotice;