﻿using System.Runtime.Serialization;

namespace WMS.Service
{
    [Serializable]
    internal class exception : Exception
    {
        public exception()
        {
        }

        public exception(string? message) : base(message)
        {
        }

        public exception(string? message, Exception? innerException) : base(message, innerException)
        {
        }

        protected exception(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}