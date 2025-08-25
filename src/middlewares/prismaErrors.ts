import { Prisma } from "@prisma/client";

export const prismaErrorMap: Record<string, string> = {
    // User-friendly, generic messages for known Prisma errors
    P2000: "One of the values is too long. Please shorten the input and try again.",
    P2001: "We couldn't find the item you requested.",
    P2002: "An item with that value already exists. Please use a different value.",
    P2003: "A related record required for this action is missing.",
    P2004: "A database constraint prevented this action. Please check your input and try again.",
    P2005: "There is an invalid value in the database. Please try again or contact support.",
    P2006: "A provided value has the wrong type or format. Please check your input.",
    P2007: "Some input failed validation. Please review and correct the data.",
    P2008: "The database could not parse the request. Please try again.",
    P2009: "The database rejected the request. Please verify the data and try again.",
    P2010: "A low-level database operation failed. Please try again later.",
    P2011: "A required field was set to null. Please provide a value for all required fields.",
    P2012: "A required value is missing. Please include all required information.",
    P2013: "A required argument is missing. Please include all necessary fields.",
    P2014: "A related record is missing. Ensure related data exists before retrying.",
    P2015: "A related item could not be found. Please verify related records exist.",
    P2016: "There was a problem interpreting the request. Please try again.",
    P2017: "Related records are not connected. Please ensure relationships are correct.",
    P2018: "Required related records were not found. Please confirm related data exists.",
    P2019: "Invalid input provided. Please check the data and try again.",
    P2020: "A value is out of the allowed range. Please use a valid value.",
    P2021: "The requested table or resource does not exist.",
    P2022: "A required database column is missing.",
    P2023: "Inconsistent data detected. Please try again or contact support if the issue continues.",
    P2024: "The database request timed out. Please try again.",
    P2025: "The record you're trying to update or delete was not found.",
    P2026: "This operation isn't supported by the database engine.",
    P2027: "Multiple database errors occurred. Please review the request and try again.",
    P2028: "The operation was not completed. Please try again."

}