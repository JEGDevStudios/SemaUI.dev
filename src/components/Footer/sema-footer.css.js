import { css } from "lit";

export const SemaFooterStyles = css`
	/* Footer */
	footer {
		padding: 4rem 1.5rem;
		background: #171212;
		color: white;
	}

	.footer-links {
		display: flex;
		gap: 1.5rem;
		list-style: none;
		padding: 0;
		margin: 2rem 0 0 0;
	}

	.footer-links a {
		color: #9ca3af;
		text-decoration: none;
		font-size: 0.875rem;
		font-weight: 500;
		transition: color 0.2s;
	}

	.footer-links a:hover {
		color: white;
	}

	.footer-copy {
		font-size: 10px;
		color: #6b7280;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		margin-top: 2rem;
		padding-top: 2rem;
		border-top: 1px solid #333;
	}
`;
